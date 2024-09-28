<?php

use App\Http\Controllers\BoxController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/boxes', [BoxController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('boxes.index');
Route::get('/boxes/create', [BoxController::class, 'create'])
    ->middleware(['auth', 'verified'])->name('boxes.create');
Route::post('/boxes/store', [BoxController::class, 'store'])->name('boxes.store');
Route::get('/box/{id}', [BoxController::class, 'show'])
    ->middleware(['auth', 'verified'])->name('boxes.show');
Route::get('/folder/{id}', [FolderController::class, 'show'])
    ->middleware(['auth', 'verified'])->name('folders.show');
Route::get('/file/create', [FileController::class, 'create'])
    ->middleware(['auth', 'verified'])->name('files.create');
Route::post('file/store', [FileController::class, 'store'])
    ->middleware(['auth', 'verified'])->name('files.store');
Route::get('/file/{id}', [FileController::class, 'show'])
    ->middleware(['auth', 'verified'])->name('files.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
