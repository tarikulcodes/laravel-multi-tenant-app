<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:superadmin'])->group(function () {
    require __DIR__ . '/central/admin.php';
});
