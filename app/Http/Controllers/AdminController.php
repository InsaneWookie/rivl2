<?php

namespace App\Http\Controllers;


use App\Competition;
use App\Libraries\GameLibrary;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Recalculates all players elo from the beginning of time
     *
     * @return \Illuminate\Http\Response
     */
    public function recalculate_elo(Competition $competition)
    {
        ini_set('max_execution_time', 300);

        DB::transaction(function() use ($competition) {
            $gameLib = new GameLibrary();
            $gameLib->updateAllElo($competition);
        });

        return response(array('success' => true));

    }




}
