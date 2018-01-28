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

    public static function getElo(CompetitorElo $competitor1Elo, CompetitorElo $competitor2Elo, $winnerId)
    {
        $kFactor = 32;

        $p1Elo = $competitor1Elo->elo;
        $p2Elo = $competitor2Elo->elo;

        $rating1 = 10 ** ($p1Elo / 400);
        $rating2 = 10 ** ($p2Elo / 400);


        //Onto the expected score for each player:

        $expected1 = $rating1 / ($rating1 + $rating2);
        $expected2 = $rating2 / ($rating1 + $rating2);


        if($winnerId === $competitor1Elo->competitor_id){
            $newRating1 = $p1Elo + $kFactor * (1 - $expected1);
            $newRating2 = $p2Elo + $kFactor * (0 - $expected2);
        } else {
            $newRating1 = $p1Elo + $kFactor * (0 - $expected1);
            $newRating2 = $p2Elo + $kFactor * (1 - $expected2);
        }

        return [
            'player1Elo' => $newRating1,
            'player2Elo' => $newRating2,
        ];
    }
}