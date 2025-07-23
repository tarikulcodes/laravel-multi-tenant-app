<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $queryParams = request()->only(['search', 'page', 'per_page', 'sort_by', 'sort_dir']) + ['page' => 1, 'per_page' => 10, 'sort_by' => 'id', 'sort_dir' => 'desc'];
        $users = User::query()
            ->when(request()->has('search'), function ($query) {
                $query->where('name', 'like', '%' . request()->input('search') . '%');
            })
            ->orderBy($queryParams['sort_by'], $queryParams['sort_dir'])
            ->paginate($queryParams['per_page'])
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'usersData' => UserResource::collection($users)->additional([
                'queryParams' => $queryParams,
            ]),
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
