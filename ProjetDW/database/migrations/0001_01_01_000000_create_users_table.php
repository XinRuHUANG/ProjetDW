<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\{Schema, DB};

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('idUser');    
            $table->string('lastName', 50);
            $table->string('firstName', 50);
            $table->string('password', 255);
            $table->string('email', 255)->unique();
            $table->integer('age')->nullable();
            $table->date('birthDate')->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable();
            $table->string('photoURL', 255)->nullable();
            $table->enum('userType', ['Admin', 'Member2', 'Member1', 'Guest'])->default('Guest');
            $table->integer('points')->default(0);
            $table->string('reason');
            $table->integer('remaining_points');
            $table->timestamps();
        });

        // Ajout de la contrainte CHECK via une requête SQL brute
        DB::statement('ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 0)');

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        
        // Suppression de la contrainte avant de supprimer la table
        DB::statement('ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_age');
        Schema::dropIfExists('users');
    }
};