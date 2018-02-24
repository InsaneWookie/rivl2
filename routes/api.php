<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('competitor/{id}/avatar', 'CompetitorController@avatar');
Route::get('competition/{competition}/competitor_stats/{competitor?}', 'CompetitorController@stats');
Route::get('competition/{competition}/competitor_graph_stats/{competitor}', 'CompetitorController@graph_stats');
Route::get('admin/recalculate_elo/{competition}', 'AdminController@recalculate_elo');

Route::resource('competitor', 'CompetitorController');
Route::resource('competition', 'CompetitionController');
//Route::resource('game', 'GameController');

Route::resource('competition.game', 'GameController');
Route::resource('competition.competitor', 'CompetitorController');
Route::resource('competition.competitor.game', 'GameController');


