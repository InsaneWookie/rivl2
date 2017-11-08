<?php

namespace App\Http\Controllers;

use App\Competition;
use App\Competitor;
use Illuminate\Http\Request;

class CompetitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Competition $competition
     * @return \Illuminate\Http\Response
     */
    public function index(Competition $competition)
    {
        return response($competition->load('competitors'));
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Competitor  $competitor
     * @return \Illuminate\Http\Response
     */
    public function show(Competitor $competitor)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Competitor  $competitor
     * @return \Illuminate\Http\Response
     */
    public function edit(Competitor $competitor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Competitor  $competitor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Competitor $competitor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Competitor  $competitor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Competitor $competitor)
    {
        //
    }
}
