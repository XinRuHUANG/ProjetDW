<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id('idBook');
            $table->string('title');
            $table->string('author');
            $table->year('yearPublished')->nullable();
            $table->string('category')->nullable();
            $table->text('summary')->nullable();
            $table->string('status')->default('Available'); // PAS enum ici pour éviter conflits
            $table->unsignedInteger('stock')->default(0);
            $table->string('cover')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};

