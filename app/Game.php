<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'game';
    public $timestamps = false;

    public function competition()
    {
        return $this->belongsTo('App\Competition');
    }
}
