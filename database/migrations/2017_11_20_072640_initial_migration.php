<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InitialMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competition', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 128);
            $table->integer('points')->default(1);
            $table->integer('parent')->nullable();
            $table->timestamps();
        });

        Schema::create('competitor', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 128);
            $table->string('email', 128)->nullable();
            $table->string('status', 20)->default('active');
            $table->string('challonge_username', 128)->nullable();
            $table->string('avatar_image', 128)->nullable();
            $table->timestamps();
        });

        Schema::create('competitor_elo', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('competition_id')->unsigned();
            $table->integer('competitor_id')->unsigned();
            $table->decimal('elo', 64, 4)->default(1500);
            $table->string('status', 20)->default('active');
            $table->string('pseudonym', 128)->nullable();
            $table->foreign('competition_id')->references('id')->on('competition');
            $table->foreign('competitor_id')->references('id')->on('competitor');
            $table->unique(['competition_id', 'competitor_id']);
            $table->timestamps();
        });

        Schema::create('game', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('competition_id')->unsigned();
            $table->string('status', 20)->default('active');
            $table->foreign('competition_id')->references('id')->on('competition');
            $table->timestamps();
        });

        Schema::create('score', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('game_id')->unsigned();
            $table->integer('competitor_id')->unsigned();
            $table->integer('rank');
            $table->integer('score');
            $table->decimal('elo_before', 64, 4);
            $table->decimal('elo_after', 64, 4);
            $table->foreign('game_id')->references('id')->on('game');
            $table->foreign('competitor_id')->references('id')->on('competitor');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropAllTables();
    }
}
