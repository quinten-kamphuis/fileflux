<?php

namespace App\Http\Controllers;

use App\Http\Resources\FileResource;
use App\Models\Box;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Redirect;
use Storage;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('FileCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $file = $request->file('file');

        $request->validate([
            'file' => 'required|file',
            'box_id' => 'required|exists:boxes,id',
        ]);

        $user = Auth::user();
        $box = Box::findOrFail($request->box_id);

        $path = "users/{$user->id}/boxes/{$box->id}/files/{$file->hashName()}";

        // Store the file
        Storage::disk('sftp')->put($path, file_get_contents($file));

        // Create database record
        $fileRecord = new File([
            'owner_id' => $user->id,
            'box_id' => $box->id,
            'name' => $file->getClientOriginalName(),
            // 'filename' => $file->hashName(),
            // 'original_filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'path' => $path,
        ]);

        $fileRecord->save();

        return Redirect::route('files.show', ['id' => $fileRecord->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $file = File::findOrFail($id);
        return Inertia::render('File', [
            'file' => new FileResource($file),
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
