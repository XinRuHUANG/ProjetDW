<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('equipment', function (Blueprint $table) {
            $table->id('idEquipment');
            $table->enum('equipmentType', ['Computer', 'Tablet']);
            $table->string('model');
            $table->string('brand');
            $table->string('serialNumber')->unique();
            $table->date('purchaseDate')->nullable();
            $table->date('warrantyExpiry')->nullable();
            $table->enum('status', ['Available', 'In Use', 'Maintenance', 'Retired'])->default('Available');
            $table->date('lastMaintenanceDate')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
