<?php

use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\TenantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('register-tenant', [TenantController::class, 'create'])->name('register-tenant.create');
    Route::post('register-tenant', [TenantController::class, 'store'])->name('register-tenant.store');
    Route::get('tenants', [TenantController::class, 'index'])->name('tenants.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
