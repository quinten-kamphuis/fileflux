<?php

namespace App\Http\Controllers;

use App\Http\Resources\BoxResource;
use App\Http\Resources\BoxesResource;
use App\Models\Box;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boxes = Box::with('owner:id,name')->get();
        return Inertia::render('Boxes', [
            'boxes' => BoxesResource::collection($boxes),
            'boxesCount' => $boxes->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $boxes = Box::with('owner:id,name')->get();
        return Inertia::render('Boxes', [
            'boxes' => BoxesResource::collection($boxes),
            'boxesCount' => $boxes->count(),
            'showCreateModal' => true,
        ]);
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
    public function show(string $id)
    {
        $box = Box::findOrFail($id);
        return Inertia::render('Box', [
            'box' => new BoxResource($box),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
