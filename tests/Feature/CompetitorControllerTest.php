<?php
/**
 * Created by PhpStorm.
 * User: Rowan
 * Date: 6/02/2018
 * Time: 7:17 PM
 */

namespace Tests\Feature;

use Tests\TestCase;

class CompetitorControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetStats()
    {
        $response = $this->get('/api/competition/2/competitor/1/stats');

        $response->assertStatus(200);

        //var_dump($response->content());
    }
}