<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    protected $table = 'competitor';
    public $timestamps = false;

    public function competitors()
    {
        return $this->belongsToMany('App\Competitor')->using('App\CompetitorElo');
    }


    public function games()
    {
        return $this->hasMany('App\Game');
    }
}
