<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'path' => $this->path,
            'owner' => new UserResource($this->owner),
            'boxId' => $this->box_id,
            'folderId' => $this->parent_folder_id,
            'size' => $this->file_size,
            'extension' => $this->extension,
            'mimeType' => $this->mime_type,
            'createdAt' => (new Carbon($this->created_at))
                ->format('Y-m-d H:i'),
            'links' => [
                'self' => route('files.show', ['file' => $this->id]),
                'parent' => $this->parentFolder ?
                    route('folders.show', ['folder' => $this->parentFolder->id]) :
                    route('boxes.show', ['box' => $this->box->id]),
                'download' => route('files.download', ['file' => $this->id]),
                'delete' => route('files.destroy', ['file' => $this->id]),
            ],
            'breadcrumbs' => $this->breadcrumbs(),
        ];
    }
}
