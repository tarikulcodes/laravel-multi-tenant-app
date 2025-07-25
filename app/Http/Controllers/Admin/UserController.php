<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $queryParams = request()->only(['search', 'page', 'per_page', 'sort_by', 'sort_dir', 'filter_by_role']) + ['page' => 1, 'per_page' => 10, 'sort_by' => 'id', 'sort_dir' => 'desc'];
        $users = User::with('roles')
            ->when(request()->has('search'), function ($query) {
                $query->where('name', 'like', '%' . request()->input('search') . '%')
                    ->orWhere('email', 'like', '%' . request()->input('search') . '%');
            })
            ->when(request()->has('filter_by_role') && $queryParams['filter_by_role'], function ($query) use ($queryParams) {
                $query->whereHas('roles', function ($query) use ($queryParams) {
                    $query->where('name', $queryParams['filter_by_role']);
                });
            })
            ->orderBy($queryParams['sort_by'], $queryParams['sort_dir'])
            ->paginate($queryParams['per_page'])
            ->withQueryString();

        $roles = Role::all();

        return Inertia::render('admin/users/index', [
            'usersData' => UserResource::collection($users)->additional([
                'queryParams' => $queryParams,
            ]),
            'roles' => RoleResource::collection($roles),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('roles');
        $roles = Role::all();

        return Inertia::render('admin/users/edit', [
            'user' => new UserResource($user),
            'roles' => RoleResource::collection($roles),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $inputs = $request->validated();

        $user->update($inputs);

        $user->syncRoles($inputs['roles']);

        return back()->with('success', 'User has been updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'User has been deleted.');
    }

    /**
     * Bulk delete users.
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        User::whereIn('id', $request->ids)->delete();

        return back()->with('success', 'Selected user(s) have been deleted.');
    }
}
