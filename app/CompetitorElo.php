<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * Class CompetitorElo
 * @package App
 *
 * @property double $elo
 */
class CompetitorElo extends Pivot
{
    protected $table = 'competitor_elo';
    public $timestamps = false; //not sure how to update the timestamps

    protected $guarded = ['elo'];
}