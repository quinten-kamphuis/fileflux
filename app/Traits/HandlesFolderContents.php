<?php

namespace App\Traits;

use App\Http\Resources\ItemResource;
use App\Models\Folder;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

trait HandlesFolderContents
{
    protected function getContents(Request $request, Model $model)
    {
        $limit = $request->input('limit', 20);
        $cursor = $request->input('cursor');
        $search = $request->input('search');

        // Fetch folders
        $foldersQuery = $model->getType() === 'box' ?
            Folder::query()
                ->where('box_id', $model->id)
                ->whereNull('parent_folder_id') :
            Folder::query()
                ->where('box_id', $model->box_id)
                ->where('parent_folder_id', $model->id);

        // Fetch files
        $filesQuery = $model->getType() === 'box' ?
            File::query()
                ->where('box_id', $model->id)
                ->whereNull('parent_folder_id') :
            File::query()
                ->where('box_id', $model->box_id)
                ->where('parent_folder_id', $model->id);

        if ($search) {
            $foldersQuery->where('name', 'ILIKE', "%{$search}%");
            $filesQuery->where('name', 'ILIKE', "%{$search}%");
        }

        if ($cursor) {
            $foldersQuery->where('name', '>', $cursor);
            $filesQuery->where('name', '>', $cursor);
        }

        $folders = $foldersQuery->orderBy('name')->take($limit + 1)->get();
        $files = $filesQuery->orderBy('name')->take($limit + 1)->get();

        // Merge folders and files
        $items = $folders->concat($files)->sortBy('name')->values();

        $hasMore = $items->count() > $limit;
        $items = $items->take($limit);

        return [
            'items' => ItemResource::collection($items),
            'next_cursor' => $hasMore ? $items->last()->name : null,
        ];
    }
}
