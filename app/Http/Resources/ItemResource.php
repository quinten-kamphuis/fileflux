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
                    route('folders.show', ['id' => $this->id]) :
                    route('files.show', ['id' => $this->id]),
                'parent' => $this->parent_folder_id ? route('folders.show', ['id' => $this->parent_folder_id]) : route('boxes.show', ['id' => $this->box_id]),
                'download' => $this->getType() === 'file' ?
                    route('files.download', ['id' => $this->id]) : null,
                'delete' => $this->getType() === 'file' ?
                    route('files.destroy', ['id' => $this->id]) : null,
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
