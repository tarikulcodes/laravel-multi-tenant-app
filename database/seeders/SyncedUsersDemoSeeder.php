<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tenant;
use App\Models\TenantUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SyncedUsersDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🚀 Creating demo tenants...');

        // Create demo tenants
        $tenant1 = Tenant::firstOrCreate(
            ['id' => 'demo-company-1'],
            ['name' => 'Demo Company 1']
        );

        if (!$tenant1->domains()->where('domain', 'demo1.localhost')->exists()) {
            $tenant1->domains()->create(['domain' => 'demo1.localhost']);
        }

        $tenant2 = Tenant::firstOrCreate(
            ['id' => 'demo-company-2'],
            ['name' => 'Demo Company 2']
        );

        if (!$tenant2->domains()->where('domain', 'demo2.localhost')->exists()) {
            $tenant2->domains()->create(['domain' => 'demo2.localhost']);
        }

        $this->command->info('👤 Creating syncable users...');

        // Create syncable users in central database
        $user1 = User::firstOrCreate(
            ['email' => 'john@example.com'],
            [
                'global_id' => Str::uuid(),
                'name' => 'John Doe',
                'password' => bcrypt('password'),
                'is_syncable' => true,
                'email_verified_at' => now(),
            ]
        );

        $user2 = User::firstOrCreate(
            ['email' => 'jane@example.com'],
            [
                'global_id' => Str::uuid(),
                'name' => 'Jane Smith',
                'password' => bcrypt('password'),
                'is_syncable' => true,
                'email_verified_at' => now(),
            ]
        );

        // Create non-syncable admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'global_id' => Str::uuid(),
                'name' => 'System Admin',
                'password' => bcrypt('password'),
                'is_syncable' => false, // Admin stays central only
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('🔗 Attaching users to tenants...');

        // Attach users to tenants (this will create TenantUser records)
        if (!$user1->tenants()->where('tenant_id', $tenant1->id)->exists()) {
            $user1->tenants()->attach($tenant1->id);
        }
        if (!$user1->tenants()->where('tenant_id', $tenant2->id)->exists()) {
            $user1->tenants()->attach($tenant2->id);
        }
        if (!$user2->tenants()->where('tenant_id', $tenant1->id)->exists()) {
            $user2->tenants()->attach($tenant1->id);
        }

        $this->command->info('✅ Demo data created successfully!');
        $this->command->line('');
        $this->command->line('📋 <comment>Demo Users Created:</comment>');
        $this->command->line("   • john@example.com (password: password) - Available in both tenants");
        $this->command->line("   • jane@example.com (password: password) - Available in tenant1 only");
        $this->command->line("   • admin@example.com (password: password) - Central admin only");
        $this->command->line('');
        $this->command->line('🌐 <comment>Demo Tenants:</comment>');
        $this->command->line("   • demo1.localhost (Demo Company 1)");
        $this->command->line("   • demo2.localhost (Demo Company 2)");
        $this->command->line('');
        $this->command->line('🔧 <comment>Test Syncing:</comment>');
        $this->command->line("   Try updating John's name in central DB and see it sync to tenants!");
    }
}
