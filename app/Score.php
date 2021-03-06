<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $table = 'score';
    public $timestamps = true;

    protected $guarded = [];

    public function game()
    {
        return $this->hasOne('App\Game');
    }
}
