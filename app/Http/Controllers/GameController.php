<?php

namespace App\Http\Controllers;

use App\Competition;
use App\CompetitorElo;
use App\Game;
use App\Libraries\EloCalculator;
use App\Score;
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

        $gameScores = $newGame['scores'];
        unset($newGame['scores']);

        $response = null;

        DB::transaction(function() use ($competition, $gameScores, &$response){

            $newGame['competition_id'] = $competition->id;
            $gameModel = Game::create($newGame);

            //convert to score models
            $scoreModels = [];
            foreach ($gameScores as $score) {
                $score['game_id'] = $gameModel->id;

                $scoreModel = new Score();
                $scoreModel->fill($score);
                $scoreModels[] = $scoreModel;
            }

            $player1Elo = CompetitorElo::where(['competitor_id' => $scoreModels[0]['competitor_id'], 'competition_id' => $competition->id])->first();
            $player2Elo = CompetitorElo::where(['competitor_id' => $scoreModels[1]['competitor_id'], 'competition_id' => $competition->id])->first();

            $newElo = EloCalculator::getElo($player1Elo, $player2Elo, (int)$this->getWinnerId($scoreModels));

            $scoreModels[0]->elo_before = $player1Elo->elo;
            $scoreModels[0]->elo_after = $newElo['player1Elo'];

            $scoreModels[1]->elo_before = $player2Elo->elo;
            $scoreModels[1]->elo_after = $newElo['player2Elo'];

            foreach($scoreModels as $scoreModel){
                $scoreModel->save();
            }

            $player1Elo->elo = $newElo['player1Elo'];
            $player2Elo->elo = $newElo['player2Elo'];

            $player1Elo->save();
            $player2Elo->save();

            $response = response(Game::where('id', $gameModel->id)->with('scores')->first());

        });


        return $response;


    }

    private function getWinnerId($scores){

        foreach ($scores as $score) {
            if($score->rank === 1){
                return $score->competitor_id;
            }
        }

        throw new \Exception("Couldn't find winner");
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
