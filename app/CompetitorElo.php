<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CompetitorElo extends Pivot
{
    protected $table = 'competitor_elo';
    public $timestamps = true;

    protected $guarded = ['elo'];
}