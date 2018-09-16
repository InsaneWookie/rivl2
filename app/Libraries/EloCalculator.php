<?php
/**
 * Created by PhpStorm.
 * User: Rowan
 * Date: 28/01/2018
 * Time: 4:37 PM
 */

namespace App\Libraries;


use App\CompetitorElo;

class EloCalculator
{

    /**
     * @param CompetitorElo $competitor1Elo
     * @param CompetitorElo $competitor2Elo
     * @param int $winnerId
     * @return array
     * @throws \Exception
     */
    public static function getElo(CompetitorElo $competitor1Elo, CompetitorElo $competitor2Elo, int $winnerId)
    {
        $kFactor = 32;

        $p1Elo = $competitor1Elo->elo;
        $p2Elo = $competitor2Elo->elo;

        $rating1 = 10 ** ($p1Elo / 400);
        $rating2 = 10 ** ($p2Elo / 400);

        $expected1 = $rating1 / ($rating1 + $rating2);
        $expected2 = $rating2 / ($rating1 + $rating2);

        if($winnerId === $competitor1Elo->competitor_id){
            $newRating1 = $p1Elo + $kFactor * (1 - $expected1);
            $newRating2 = $p2Elo + $kFactor * (0 - $expected2);
        } else if($winnerId === $competitor2Elo->competitor_id){
            $newRating1 = $p1Elo + $kFactor * (0 - $expected1);
            $newRating2 = $p2Elo + $kFactor * (1 - $expected2);
        } else {
            throw new \Exception("Winner id does not match either competitor");
        }

        return [
            'player1Elo' => $newRating1,
            'player2Elo' => $newRating2,
        ];
    }
}