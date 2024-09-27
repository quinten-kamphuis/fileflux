<?php

namespace App\Http\Resources;

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
            'folder' => new FolderResource($this->folder),
            'size' => $this->size,
            'extension' => $this->extension,
            'mimeType' => $this->mimeType,
            'links' => [
                'self' => route('files.show', ['id' => $this->id]),
                // 'download' => route('file.download', ['id' => $this->id]),
            ],
            'breadcrumbs' => $this->breadcrumbs(),
        ];
    }
}
