<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'game';
    public $timestamps = false;

    protected $guarded = [];

    public function competition()
    {
        return $this->belongsTo('App\Competition');
    }

    public function scores()
    {
        return $this->hasMany('App\Score');
    }
}
