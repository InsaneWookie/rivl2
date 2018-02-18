<?php

namespace App\Http\Controllers;

use App\Competition;
use App\CompetitorElo;
use App\Game;
use App\Libraries\EloCalculator;
use App\Libraries\GameLibrary;
use App\Score;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Competition $competition
     * @return \Illuminate\Http\Response
     */
    public function index(Competition $competition)
    {
        //todo: proper paging
//        return response(Game::where('competition_id', $competition->id)
//            ->orderBy('created_at', 'desc')->simplePaginate(15));

        $games = Game::with('scores')->where('competition_id', $competition->id)->orderBy('created_at', 'desc')
            ->limit(50)->get();

        return response($games);
        //return response($competition->games->load('scores'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Competition $competition
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Competition $competition)
    {
        $newGame = $request->json()->all();

        $newGame['competition_id'] = $competition->id;

        $gameScores = $newGame['scores'];
        unset($newGame['scores']);

        $response = null;

        DB::transaction(function() use ($competition, $newGame, $gameScores, &$response){

            $gameModel = Game::create($newGame);

            //convert to score models
            $scoreModels = [];
            foreach ($gameScores as $score) {
                $score['game_id'] = $gameModel->id;

                $scoreModel = new Score();
                $scoreModel->fill($score);
                $scoreModels[] = $scoreModel;
            }

            $gameLib = new GameLibrary();
            $gameLib->updateElo($competition, new Collection($scoreModels));

            $response = response(Game::where('id', $gameModel->id)->with('scores')->first());
        });

        return $response;
    }





    /**
     * Display the specified resource.
     *
     * @param  \App\Game $game
     * @return \Illuminate\Http\Response
     */
    public function show(Competition $competition, Game $game)
    {
        return response($game);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Game $game
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Game $game)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Game $game
     * @return \Illuminate\Http\Response
     */
    public function destroy(Game $game)
    {
        //
    }
}
