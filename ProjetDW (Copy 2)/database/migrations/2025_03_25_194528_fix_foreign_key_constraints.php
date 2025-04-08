<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\{Schema, DB};

return new class extends Migration
{
    public function up()
    {
        Schema::table('favorites', function (Blueprint $table) {
            // Supprimer les anciennes contraintes
            $table->dropForeign(['idUser']);
            $table->dropForeign(['idBook']);
            
            // Modifier les colonnes
            DB::statement('ALTER TABLE favorites MODIFY idUser BIGINT UNSIGNED');
            DB::statement('ALTER TABLE favorites MODIFY idBook BIGINT UNSIGNED');
            
            // Recréer les contraintes
            $table->foreign('idUser')
                  ->references('idUser')
                  ->on('users')
                  ->onDelete('cascade');
                  
            $table->foreign('idBook')
                  ->references('idBook')
                  ->on('books')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        // Optionnel : code pour annuler les changements
    }
};