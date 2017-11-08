<?php

namespace App\Http\Controllers;

use App\Competition;
use App\Game;
use App\Score;
use Illuminate\Http\Request;

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
        return response(Game::where('competition_id', $competition->id)->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     //   return response(var_export($request->json()->all(), true));

        $newGame = $request->json()->all();

        $gameScores = $newGame['scores'];

        unset($newGame['scores']);

        $newGame['competition_id'] = $competition->id;
        $gameModel = Game::create($newGame);


        foreach($gameScores as $score){
            $score['game_id'] = $gameModel->id;

            Score::create($score);

        }

        return response(Game::where('id', $gameModel->id)->with('scores')->get());

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function show(Competition $competition, Game $game)
    {
        return response($game);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Game $game)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function destroy(Game $game)
    {
        //
    }
}
