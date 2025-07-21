<?php

namespace Database\Seeders\central;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'superadmin',
                'text' => 'Super Admin',
                'description' => 'Has full access to all system features.',
            ],
            [
                'name' => 'admin',
                'text' => 'Admin',
                'description' => 'Has access to all system features except for administrative tasks.',
            ],
            [
                'name' => 'manager',
                'text' => 'Manager',
                'description' => 'Has access to all system features except for administrative tasks.',
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}
