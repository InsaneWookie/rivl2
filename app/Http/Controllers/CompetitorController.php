<?php

namespace App\Http\Controllers;

use App\Competition;
use App\Competitor;
use App\CompetitorElo;
use App\Score;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
     * @param  \App\Competitor $competitor
     * @return \Illuminate\Http\Response
     */
    public function show(Competition $competition, Competitor $competitor)
    {
        return response($competition->competitors->find($competitor->id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Competition $competition
     * @param  \App\Competitor $competitor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Competition $competition, Competitor $competitor)
    {
        $updateData = $request->json()->all();

        //TODO: actual competitor save

        //want to pull out the elo part

        $competitorEloData = isset($updateData['elo']) ? $updateData['elo'] : null;

        if ($competitorEloData !== null) {
            //don't allow them to move the competitor around (the can probably be handled by the guarded prop on the model)
            unset($competitorEloData['competitor_id']);
            unset($competitorEloData['competition_id']);

            $competitor->competitions()->updateExistingPivot($competition->id, $competitorEloData);
        }

        return response($competition->competitors->find($competitor->id));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Competitor $competitor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Competitor $competitor)
    {
        //
    }

    public function avatar_get(Request $request)
    {
//        $comp = Competitor::findOrFail($competitorId);

        return response(Storage::disk('s3')->get($request));
    }

    /**
     * @param Request $request
     * @param integer $competitorId
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function avatar(Request $request, $competitorId)
    {



//        $storeName = md5($file->getFilename());

//        $filePathStore = $file->storePublicly('public');
//        Storage::disk('s3')->put('avatars/', $file);

        /* @var Competitor $comp */
        $comp = Competitor::findOrFail($competitorId);
        $s3Url = $request->file('avatar')->store("avatars/$comp->id", 's3', 'public');
//        $comp->avatar_image = $s3Url;
        $comp->avatar_image = Storage::disk('s3')->url($s3Url);
        $comp->save();

        return response($comp);
//        return response(asset(Storage::url($filePathStore)));

    }

    /**
     * @param Competition $competition
     * @param Competitor $competitor
     * @return \Illuminate\Http\Response
     */
    public function stats(Competition $competition, Competitor $competitor = null)
    {

        //structure
        $stats = [
            'games_played' => 0,
            'wins' => 0,
            'losses' => 0,
        ];

        //var_export($competitor);

        $query = "
            SELECT s.competitor_id, 
            count(1) as games_played,
              CAST(sum(CASE WHEN s.rank = 1 THEN 1 ELSE 0 END) AS UNSIGNED) as wins,
              CAST(sum(CASE WHEN s.rank > 1 THEN 1 ELSE 0 END) AS UNSIGNED) as losses
            FROM game g
            JOIN score s ON g.id = s.game_id
            WHERE
              g.competition_id = ?";

        $data = [$competition->id];
        if ($competitor != null) {
            $data[] = $competitor->id;
            $query .= ' AND s.competitor_id = ? ';
        }

        $query .= ' GROUP BY s.competitor_id';


        //TODO: use the orm or query builder
        $stats = DB::select($query, $data);

        return response(json_encode($competitor === null ? $stats : $stats[0]));


    }

    public function graph_stats(Competition $competition, Competitor $competitor)
    {

//        $scores = Score::with(['game' => function ($query) use ($competition)  {
//            $query->where('competition_id', $competition->id);
//        }])->orderBy('created_at', 'desc')->limit(50)->get();

        $query = "
            SELECT s.*
            FROM game g
              JOIN score s ON g.id = s.game_id
            
            WHERE g.competition_id = :competition_id
                  AND s.competitor_id = :competitor_id
            ORDER BY s.created_at DESC
            LIMIT 50;
        ";

        $scores = DB::select($query, ['competition_id' => $competition->id, 'competitor_id' => $competitor->id]);

//        $scores = Score::query($query);
        return response(json_encode($scores));

    }


}
