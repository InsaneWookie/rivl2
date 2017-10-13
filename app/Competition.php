<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    protected $table = 'competitor';
    public $timestamps = false;

    public function games()
    {
        return $this->hasMany('App\Game');
    }
}
