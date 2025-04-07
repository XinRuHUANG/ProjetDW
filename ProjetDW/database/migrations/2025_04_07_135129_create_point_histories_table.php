<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('point_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('points');
            $table->string('reason', 255);
            $table->integer('remaining_points');
            $table->timestamps();
            
            $table->index('user_id'); // Pour les performances des requêtes
        });
    }

    public function down()
    {
        Schema::dropIfExists('point_histories');
    }
};