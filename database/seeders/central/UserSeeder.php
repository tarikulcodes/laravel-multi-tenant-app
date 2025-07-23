<?php

namespace Database\Seeders\central;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@test.com',
                'password' => bcrypt('password'),
                'role' => 'superadmin',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@test.com',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Manager',
                'email' => 'manager@test.com',
                'password' => bcrypt('password'),
                'role' => 'manager',
                'email_verified_at' => now(),
            ],

            [
                'name' => 'User',
                'email' => 'user@test.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $user) {
            if (isset($user['role'])) {
                $roleName = $user['role'];
                unset($user['role']);
            }
            $user = User::firstOrCreate(['email' => $user['email']], $user);

            if (isset($roleName)) {
                $user->assignRole($roleName);
            }
        }

        User::factory()->count(100)->create();
    }
}
