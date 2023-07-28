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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->integer("montant");
            $table->foreignId("expediteur_id")->constrained("users");
            $table->foreignId("distinataire_id")->constrained("users");
            $table->enum("type", ["depot", "retrait", "transfert sans code", "transfert avec code", "transfert immediat"]);
            $table->string("code")->nullable();
            $table->dateTime('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
