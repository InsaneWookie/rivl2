<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    protected $table = 'competition';
    public $timestamps = true;

    protected $guarded = [];

    public function competitors()
    {
        return $this->belongsToMany('App\Competitor', 'competitor_elo')
            ->as('elo') //renames the pivot key
            ->using('App\CompetitorElo') //says we want to use a model, not sure how this helps at the moment
            ->withPivot(['elo', 'status', 'pseudonym']); //add columns to the pivot element when querying
    }


    public function games()
    {
        return $this->hasMany('App\Game');
    }
}
