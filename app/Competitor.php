<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Competitor
 * @package App
 *
 * @property int id
 * @property string avatar_image
 */
class Competitor extends Model
{
    protected $table = 'competitor';
    public $timestamps = true;

    protected $guarded = [];

    public function competitions()
    {
        return $this->belongsToMany('App\Competition', 'competitor_elo')
            ->as('elo')//renames the pivot key
            ->using('App\CompetitorElo')//says we want to use a model, not sure how this helps at the moment
            ->withPivot(['elo', 'status', 'pseudonym']) //add columns to the pivot element when querying;
            ->withTimestamps();
    }
}
