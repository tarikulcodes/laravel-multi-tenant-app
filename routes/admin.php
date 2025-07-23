<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth'])
    ->group(function () {
        Route::permanentRedirect('/', '/admin/dashboard');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });
