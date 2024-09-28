<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileActionRequest;
use App\Http\Resources\FileResource;
use App\Models\Box;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Redirect;
use Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

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
    public function store(FileActionRequest $request)
    {

        $file = $request->file('file');

        $user = Auth::user();
        $box = Box::findOrFail($request->box_id);
        $parentFolderId = $request->parent_folder_id;

        $path = "users/{$user->id}/boxes/{$box->id}/files/{$file->hashName()}";

        // Store the file
        Storage::disk('sftp')->put($path, file_get_contents($file));

        // Create database record
        $fileRecord = new File([
            'owner_id' => $user->id,
            'box_id' => $box->id,
            'parent_folder_id' => $parentFolderId,
            'filename' => $file->hashName(),
            'name' => $file->getClientOriginalName(),
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
     * Download the specified resource.
     */
    public function download(string $id)
    {
        $file = File::findOrFail($id);
        $filePath = $file->path;

        return Storage::disk('sftp')->download($filePath, $file->name);
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
        $file = File::findOrFail($id);
        $filePath = $file->path;

        $file->delete();

        Storage::disk('sftp')->delete($filePath);

        return Redirect::route('boxes.show', ['id' => $file->box_id]);
    }
}
