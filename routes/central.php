<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:superadmin|admin|manager'])->group(function () {
    require __DIR__ . '/central/admin.php';
});
