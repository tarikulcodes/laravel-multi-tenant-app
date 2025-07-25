<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Stancl\Tenancy\Database\Concerns\CentralConnection;
use Stancl\Tenancy\Database\Concerns\ResourceSyncing;
use Stancl\Tenancy\Database\Models\TenantPivot;
use Stancl\Tenancy\Contracts\SyncMaster;

class User extends Authenticatable implements SyncMaster
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, ResourceSyncing, CentralConnection;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'global_id',
        'name',
        'email',
        'password',
        'is_syncable',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_syncable' => 'boolean',
        ];
    }

    /**
     * Relationship to tenants where this user exists
     * Only applies to syncable users
     */
    public function tenants(): BelongsToMany
    {
        return $this->belongsToMany(Tenant::class, 'tenant_users', 'global_user_id', 'tenant_id', 'global_id')
            ->using(TenantPivot::class);
    }

    /**
     * Get the tenant model name for syncing
     */
    public function getTenantModelName(): string
    {
        return TenantUser::class;
    }

    /**
     * Get the global identifier key value
     */
    public function getGlobalIdentifierKey()
    {
        return $this->getAttribute($this->getGlobalIdentifierKeyName());
    }

    /**
     * Get the global identifier key name
     */
    public function getGlobalIdentifierKeyName(): string
    {
        return 'global_id';
    }

    /**
     * Get the central model name for syncing
     */
    public function getCentralModelName(): string
    {
        return static::class;
    }

    /**
     * Get the attribute names that should be synced across databases
     * Only syncs for users where is_syncable = true
     */
    public function getSyncedAttributeNames(): array
    {
        return [
            'name',
            'email',
            'password',
            'email_verified_at',
        ];
    }
}
