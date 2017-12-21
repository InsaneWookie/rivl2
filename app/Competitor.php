<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competitor extends Model
{
    protected $table = 'competitor';
    public $timestamps = true;

    protected $guarded = [];

    public function competitions()
    {
        return $this->belongsToMany('App\Competition')->withPivot('elo');
    }
}
