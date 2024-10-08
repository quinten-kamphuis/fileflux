<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFolderRequest;
use App\Http\Resources\FolderResource;
use App\Models\Folder;
use App\Traits\HandlesFolderContents;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;

class FolderController extends Controller
{
    use HandlesFolderContents;

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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFolderRequest $request)
    {
        $data = $request->validated();


        $folder = new Folder([
            'name' => $data['name'],
            'parent_folder_id' => $data['parent_folder_id'] ?? null,
            'box_id' => $data['box_id'],
            'owner_id' => auth()->id(),
        ]);

        $folder->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $folder = Folder::findOrFail($id);
        $contents = $this->getContents($request, $folder);

        if ($request->wantsJson()) {
            return response()->json([
                'items' => $contents['items'],
                'nextCursor' => $contents['next_cursor'],
            ]);
        }

        return Inertia::render('Folder', [
            'folder' => new FolderResource($folder),
            'items' => $contents['items'],
            'nextCursor' => $contents['next_cursor'],
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
        $folder = Folder::findOrFail($id);

        DB::transaction(function () use ($folder) {
            $this->deleteRecursively($folder);
        });
    }

    /**
     * Recursively delete a folder and all its contents.
     */
    private function deleteRecursively(Folder $folder)
    {
        // Delete all files in this folder
        foreach ($folder->files as $file) {
            Storage::disk('sftp')->delete($file->path);
            $file->delete();
        }

        // Recursively delete all subfolders and their contents
        foreach ($folder->folders as $subfolder) {
            $this->deleteRecursively($subfolder);
        }

        // Delete the folder itself
        $folder->delete();
    }
}
