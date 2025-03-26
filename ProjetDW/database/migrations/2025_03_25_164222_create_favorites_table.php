<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id('idFavorite');
            
            // Utilisez le même type que dans la table users
            $table->unsignedBigInteger('idUser'); // Doit correspondre au type de users.idUser
            $table->unsignedBigInteger('idBook'); // Doit correspondre au type de books.idBook
            
            $table->timestamps();

            // Clé étrangère vers users
            $table->foreign('idUser')
                  ->references('idUser')
                  ->on('users')
                  ->onDelete('cascade');
                  
            // Clé étrangère vers books
            $table->foreign('idBook')
                  ->references('idBook')
                  ->on('books')
                  ->onDelete('cascade');
                  
            // Contrainte d'unicité
            $table->unique(['idUser', 'idBook']);
        });
    }

    public function down()
    {
        Schema::table('favorites', function (Blueprint $table) {
            $table->dropForeign(['idUser']);
            $table->dropForeign(['idBook']);
        });
        
        Schema::dropIfExists('favorites');
    }
};