<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('global_id')->nullable()->after('id');
        });

        // Generate global_id for existing users that should be syncable
        // You can modify this logic based on your needs
        DB::table('users')->whereNull('global_id')->update([
            'global_id' => DB::raw('UUID()'),
        ]);

        // Add unique constraint after populating data
        Schema::table('users', function (Blueprint $table) {
            $table->unique('global_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['global_id']);
            $table->dropColumn(['global_id']);
        });
    }
};
