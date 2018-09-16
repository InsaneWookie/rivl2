<?php
/**
 * Created by PhpStorm.
 * User: Rowan
 * Date: 28/01/2018
 * Time: 4:26 PM
 */

namespace Tests\Unit;


use App\CompetitorElo;
use App\Libraries\EloCalculator;
use Tests\TestCase;

class EloCalculatorTest extends TestCase
{

    /**
     * @throws \Exception
     */
    public function testGetEloBothPlayersOnSameElo(){


        $elo1 = new CompetitorElo();
        $elo2 = new CompetitorElo();

        $elo1->fill(['competitor_id' => 1]);
        $elo1->elo = 1500; //can't put in fill() as its a guarded field

        $elo2->fill(['competitor_id' => 2]);
        $elo2->elo = 1500;


        $actualElo = EloCalculator::getElo($elo1, $elo2, 1);

        $expected = [
            'player1Elo' => 1516,
            'player2Elo' => 1484,
        ];

        $this->assertEquals($expected, $actualElo);

        $actualElo = EloCalculator::getElo($elo1, $elo2, 2);

        $expected = [
            'player1Elo' => 1484,
            'player2Elo' => 1516,
        ];

        $this->assertEquals($expected, $actualElo);
    }
}