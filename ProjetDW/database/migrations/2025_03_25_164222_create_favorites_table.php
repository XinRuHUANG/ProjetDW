<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id('idFavorite');
            $table->unsignedBigInteger('idUser');
            $table->unsignedBigInteger('idBook');
            $table->timestamps();

            $table->foreign('idUser')->references('idUser')->on('users')->onDelete('cascade');
            $table->foreign('idBook')->references('idBook')->on('books')->onDelete('cascade');
            $table->unique(['idUser', 'idBook']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
