# Laravel Multi-Tenant App

A multi-tenant SaaS application built with Laravel using the Tenancy for Laravel package.

## Features

- Multi-database tenancy
- **Synced Users**: Share user accounts between central and tenant databases
- Domain-based tenant identification
- Role-based permissions using Spatie Permission package
- Modern UI with React/Inertia.js and Tailwind CSS

## Synced Users Implementation

This application implements synced resources following the [Tenancy for Laravel documentation](https://tenancyforlaravel.com/docs/v3/synced-resources-between-tenants) to share user accounts between the central database and tenant databases.

### How It Works

1. **User Model (Central)**: Manages users in the central database, implements `SyncMaster`
2. **TenantUser Model**: Manages users in tenant databases, implements `Syncable`
3. **Pivot Table**: `tenant_users` table maps which users exist in which tenants
4. **Automatic Syncing**: Changes to synced attributes are automatically propagated

### Architecture

```
Central Database:
├── users table (User model - SyncMaster)
│   ├── id, global_id, name, email, password
│   ├── is_syncable (boolean flag)
│   └── admin/public users + syncable users
└── tenant_users table (pivot)
    └── tenant_id → global_user_id mapping

Tenant Database:
└── users table (TenantUser model - Syncable)
    ├── id, global_id, name, email, password
    └── tenant-specific: roles, permissions, settings
```

### Synced Attributes

The following user attributes are synchronized across all databases:

- `name`
- `email`
- `password`
- `email_verified_at`

### Usage Examples

#### 1. Create a Syncable User in Central Database

```php
// Create a user in central database
$user = User::create([
    'global_id' => Str::uuid(),
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => bcrypt('password'),
    'is_syncable' => true, // Enable syncing
]);

// Attach user to tenants
$tenant1 = Tenant::find('tenant1');
$tenant2 = Tenant::find('tenant2');

$user->tenants()->attach([$tenant1->id, $tenant2->id]);
```

#### 2. Update User Data (Syncs Automatically)

```php
// Update user in central database
$user = User::where('email', 'john@example.com')->first();
$user->update([
    'name' => 'John Smith', // Syncs to all tenant databases
    'password' => bcrypt('new-password'), // Syncs to all tenant databases
]);

// Or update from tenant side
tenancy()->initialize($tenant1);
$tenantUser = TenantUser::where('global_id', $user->global_id)->first();
$tenantUser->update([
    'name' => 'Johnny Smith', // Syncs back to central and other tenants
]);
```

#### 3. Work with Tenant-Specific Data

```php
tenancy()->initialize($tenant1);
$tenantUser = TenantUser::where('global_id', $user->global_id)->first();

// Assign tenant-specific roles (NOT synced)
$tenantUser->assignRole('admin');

// Tenant-specific settings (NOT synced)
$tenantUser->update([
    'tenant_preferences' => ['theme' => 'dark'],
    'last_login_tenant' => now(),
]);
```

### User Types

The system supports three types of users in the central database:

1. **Admin Users** (`is_syncable = false`)

    - System administrators
    - Only exist in central database
    - Handle overall system management

2. **Public Users** (`is_syncable = false`)

    - Website visitors, marketing site users
    - Only exist in central database
    - Don't need tenant access

3. **Syncable Users** (`is_syncable = true`)
    - SaaS application users
    - Can exist in multiple tenants
    - Synchronized across databases

### Authentication Flow

1. User logs in via central authentication (Laravel's default auth)
2. System checks if user has access to current tenant
3. If yes, user data is available in tenant context via `TenantUser`
4. Tenant-specific roles/permissions applied

### Database Migrations

Run these commands to set up the synced users:

```bash
# Run central database migrations
php artisan migrate

# Run tenant database migrations
php artisan tenants:migrate
```

### Configuration

- **Queueing**: Resource syncing is automatically queued in production
- **Event Listeners**: Configured in `TenancyServiceProvider`
- **Models**: `User` (central) and `TenantUser` (tenant) models

### Important Notes

- Only users with `is_syncable = true` will sync to tenants
- Changes trigger automatic syncing via the `ResourceSyncing` trait
- Tenant-specific data (roles, permissions) remains isolated per tenant
- Password changes in central database sync to all tenant databases

For more information, see the [Tenancy for Laravel documentation](https://tenancyforlaravel.com/docs/v3/synced-resources-between-tenants).

<div style="color: red; font-weight: bold; font-size: 1.2em; border: 2px solid red; padding: 10px; margin: 10px 0; background-color: #ffe6e6;">
🚧 Currently in Development - Coming Soon!<br>
Active development started January 17, 2025.
</div>

## Overview

This is a Laravel-based multi-tenant application with React frontend using Inertia.js.

## Development Status

🚧 **Active Development** - Features may be incomplete or subject to change.
