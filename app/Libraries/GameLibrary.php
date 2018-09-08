<?php

namespace App\Libraries;

use App\Competition;
use App\CompetitorElo;
use App\Game;
use App\Libraries\EloCalculator;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use function Psy\debug;


class GameLibrary
{


    public function __construct()
    {
    }


    public function updateAllElo(Competition $competition)
    {
        //go though all the games and re calculate the elo
        Log::debug('Starting game fetch');

        $games = Game::where('competition_id', $competition->id)
            ->orderBy('created_at', 'asc')
            //->with('scores')
            ->get();

        //get all competitor elos for this competition

        $elos = CompetitorElo::where('competition_id', $competition->id)->get();

        foreach ($elos as $elo) {
            $elo->elo = 1500; //reset all players elo to default
        }

        Log::debug('Finished game fetch');
        foreach ($games as $game) {

            $scores = $game->scores;
            if (count($scores) !== 2) {
                throw new Exception("Invalid score count. (count: " . count($scores) . ")");
            }

            //want to build up the players elo in memory so we aren't doing lots of db writes
            $newPlayerElos = $this->calculateNewPlayerElo($competition, $elos, $scores);

        }

        Log::debug('Saving elo');
        $elos->each->save();

        Log::debug('Finished processing');
    }

     public function updateElo(Competition $competition, Collection $scoreModels)
    {
        //TODO: turn this into a single query

        //for the moment, we need to grab a lock on the competitor_elo rows
        //as if multiple request come in at the same time they will all read the same
        //value and all change the elo by the same amount
        $playerElos = new Collection([
            CompetitorElo::where([
                'competitor_id' => $scoreModels[0]->competitor_id,
                'competition_id' => $competition->id])->lockForUpdate()->first(),
            CompetitorElo::where([
                'competitor_id' => $scoreModels[1]->competitor_id,
                'competition_id' => $competition->id])->lockForUpdate()->first()
        ]);

        $newPlayerElos = $this->calculateNewPlayerElo($competition, $playerElos, $scoreModels);

        $newPlayerElos[0]->save();
        $newPlayerElos[1]->save();
    }

    /**
     * @param Competition $competition
     * @param Collection $elos - Assumes that all the elos are from the same competition
     * @param Collection $scoreModels
     * @return array
     */
    public function calculateNewPlayerElo(Competition $competition, Collection &$elos, Collection $scoreModels)
    {
        $player1Elo = $elos->first(function ($elo, $key) use ($scoreModels, $competition) {
            return $elo->competitor_id == $scoreModels[0]->competitor_id && $elo->competition_id == $competition->id;
        });


        $player2Elo = $elos->first(function ($elo, $key) use ($scoreModels, $competition) {
            return $elo->competitor_id == $scoreModels[1]->competitor_id && $elo->competition_id == $competition->id;
        });


        $newElo = EloCalculator::getElo($player1Elo, $player2Elo, (int)$this->getWinnerId($scoreModels));

        $scoreModels[0]->elo_before = $player1Elo->elo;
        $scoreModels[0]->elo_after = $newElo['player1Elo'];

        $scoreModels[1]->elo_before = $player2Elo->elo;
        $scoreModels[1]->elo_after = $newElo['player2Elo'];

        foreach ($scoreModels as $scoreModel) {
            $scoreModel->save();
        }

        $player1Elo->elo = $newElo['player1Elo'];
        $player2Elo->elo = $newElo['player2Elo'];

        return [
            $player1Elo,
            $player2Elo
        ];
    }


    private function getWinnerId($scores)
    {

        foreach ($scores as $score) {
            if ($score->rank === 1) {
                return $score->competitor_id;
            }
        }

        throw new \Exception("Couldn't find winner");
    }

}