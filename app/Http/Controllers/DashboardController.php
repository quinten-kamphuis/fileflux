<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $boxesCount = Auth::user()->boxes()->count();

        return Inertia::render('Dashboard', [
            'boxesCount' => $boxesCount,
        ]);
    }
}
