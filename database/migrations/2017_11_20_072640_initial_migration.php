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
            $table->string('email', 128);
            $table->string('status', 20)->default('active');
            $table->string('challonge_username', 128);
            $table->timestamps();
        });

        Schema::create('competitor_elo', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('competition_id');
            $table->integer('competitor_id');
            $table->decimal('elo', 64, 4);
            $table->string('status', 20)->default('active');
            $table->string('pseudonym', 128);
            $table->timestamps();
        });

        Schema::create('game', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('competition_id');
            $table->string('status', 20)->default('active');
            $table->timestamps();
        });

        Schema::create('score', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('game_id');
            $table->integer('competitor_id');
            $table->integer('rank');
            $table->integer('score');
            $table->decimal('elo_before', 64, 4);
            $table->decimal('elo_after', 64, 4);
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
