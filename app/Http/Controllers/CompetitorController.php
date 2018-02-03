<?php

namespace App\Http\Controllers;

use App\Competition;
use App\Competitor;
use App\CompetitorElo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        return response($competition->competitors);
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
        $competitor = $request->json()->all();

        $newCompetitor = Competitor::create($competitor);

        CompetitorElo::create(['competition_id' => $competition->id, 'competitor_id' => $newCompetitor->id, 'elo' => 1500]);

        return response($competition->competitors->find($newCompetitor->id));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Competitor  $competitor
     * @return \Illuminate\Http\Response
     */
    public function show(Competition $competition, Competitor $competitor)
    {
        return response($competition->competitors->find($competitor->id));
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

    /**
     * @param Request $request
     * @param integer $competitorId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response

     */
    public function avatar(Request $request, $competitorId)
    {
        $file = $request->file('avatar');


//        $storeName = md5($file->getFilename());

        $filePathStore = $file->storePublicly('public');


        $comp = Competitor::findOrFail($competitorId);
        $comp->avatar_image = Storage::url($filePathStore);
        $comp->save();

        return response($comp);
//        return response(asset(Storage::url($filePathStore)));

    }
}
