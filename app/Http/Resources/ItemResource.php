<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->getType(),
            'owner' => new UserResource($this->owner),
            'boxId' => $this->box_id,
            'parentFolderId' => $this->parent_folder_id,
            'size' => $this->size,
            'mimeType' => $this->mime_type,
            'links' => [
                'self' => $this->getType() === 'folder' ?
                    route('folders.show', ['folder' => $this->id]) :
                    route('files.show', ['file' => $this->id]),
                'parent' => $this->parent_folder_id ?
                    route('folders.show', ['folder' => $this->parent_folder_id]) :
                    route('boxes.show', ['box' => $this->box_id]),
                'download' => $this->getType() === 'file' ?
                    route('files.download', ['file' => $this->id]) :
                    route('folders.download', ['folder' => $this->id]),
                'delete' => $this->getType() === 'file' ?
                    route('files.destroy', ['file' => $this->id]) :
                    route('folders.destroy', ['folder' => $this->id]),
            ],
            'folderCount' => $this->getType() === 'folder' ?
                $this->getFolderCount($this) : null,
            'fileCount' => $this->getType() === 'folder' ?
                $this->getFileCount($this) : null,
            'createdAt' => (new Carbon($this->created_at))
                ->format('Y-m-d H:i'),
        ];
    }
}
