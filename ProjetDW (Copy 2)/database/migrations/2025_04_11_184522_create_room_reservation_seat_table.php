<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('room_reservation_seat', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('id_reservation');
            $table->unsignedInteger('id_seat');
            $table->foreign('id_reservation')->references('id_reservation')->on('room_reservations')->onDelete('cascade');
            $table->foreign('id_seat')->references('id_seat')->on('seats')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_reservation_seat');
    }
};
