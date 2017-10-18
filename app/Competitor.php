<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competitor extends Model
{
    protected $table = 'competitor';
    public $timestamps = false;

    public function competitions()
    {
        return $this->belongsToMany('App\Competition')->using('App\CompetitorElo');
    }
}
