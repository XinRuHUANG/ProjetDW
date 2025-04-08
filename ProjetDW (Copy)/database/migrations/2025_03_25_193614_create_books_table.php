<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->bigIncrements('idBook'); // Au lieu de integer()->autoIncrement()            $table->string('title', 100);
            $table->string('author', 100);
            $table->year('yearPublished')->nullable();
            $table->string('category', 50)->nullable();
            $table->text('summary')->nullable();
            $table->enum('status', ['Available', 'Borrowed', 'Reserved'])->default('Available');
            $table->integer('stock')->default(1);
            $table->date('borrowStartDate')->nullable();
            $table->date('borrowEndDate')->nullable();
            $table->integer('idUser')->nullable()->unsigned();
            
            $table->timestamps();
            
            // Contraintes
            $table->check('stock >= 0');
        });
    }

    public function down()
    {
        Schema::dropIfExists('books');
    }
};