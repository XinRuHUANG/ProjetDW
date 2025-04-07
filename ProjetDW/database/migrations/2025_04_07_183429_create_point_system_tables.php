<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Table pour l'historique des points
        Schema::create('point_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('points');
            $table->string('reason');
            $table->integer('remaining_points');
            $table->timestamps();
        });

        // Ajoutez les colonnes à la table users
        Schema::table('users', function (Blueprint $table) {
            $table->integer('points')->default(0);
            $table->integer('books_read')->default(0);
            $table->integer('library_hours')->default(0);
            $table->integer('printed_pages')->default(0);
            $table->enum('user_type', ['Admin', 'Member2', 'Member1', 'Guest'])->default('Guest');
        });
    }

    public function down()
    {
        Schema::dropIfExists('point_histories');
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['points', 'books_read', 'library_hours', 'printed_pages', 'user_type']);
        });
    }
};