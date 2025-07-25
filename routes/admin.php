<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth'])
    ->group(function () {
        Route::permanentRedirect('/', '/admin/dashboard');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::delete('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
        Route::resource('users', UserController::class)->except(['show', 'create', 'store']);

        Route::delete('/tenants/bulk-delete', [TenantController::class, 'bulkDelete'])->name('tenants.bulk-delete');
        Route::resource('tenants', TenantController::class)->only(['index', 'show', 'destroy']);
    });
