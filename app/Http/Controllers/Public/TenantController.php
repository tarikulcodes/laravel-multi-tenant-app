<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\TenantResource;
use App\Models\Tenant;
use App\Models\TenantUser;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tenants = Tenant::all();

        return Inertia::render('public/tenants/index', [
            'tenants' => TenantResource::collection($tenants),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('public/tenants/register', [
            'centralDomain' => config('tenancy.central_domains')[0] ?? 'localhost',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $centralDomain = config('tenancy.central_domains')[0] ?? 'localhost';

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'subdomain' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9-]+$/',
                'not_in:www,mail,ftp,admin,api,app,tenant,central,master,localhost',
                Rule::unique('domains', 'domain')->where(function ($query) {
                    return $query->where('domain', 'like', "%");
                }),
            ],
        ], [
            'subdomain.regex' => 'The subdomain may only contain lowercase letters, numbers, and hyphens.',
            'subdomain.not_in' => 'This subdomain is reserved and cannot be used.',
            'subdomain.unique' => 'This subdomain is already taken.',
        ]);

        // Create the tenant
        $tenant = Tenant::create([
            'name' => $validated['name'],
        ]);

        // Create the domain for the tenant
        $tenant->domains()->create([
            'domain' => $validated['subdomain'],
        ]);

        $user = request()->user();

        tenancy()->initialize($tenant);

        TenantUser::create([
            'global_id' => $user->global_id,
            'name' => $user->name,
            'email' => $user->email,
            'password' => $user->password,
            'email_verified_at' => $user->email_verified_at,
        ]);

        tenancy()->end();

        return to_route('register-tenant.create')
            ->with('success', 'Tenant registered successfully! Your tenant is available at: ' . $validated['subdomain']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tenant $tenant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        //
    }
}
