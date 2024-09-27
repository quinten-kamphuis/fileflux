<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FolderResource extends JsonResource
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
            'parent' => new FolderResource($this->parentFolder),
            'links' => [
                'self' => route('folders.show', ['id' => $this->id]),
                'parent' => $this->parentFolder ?
                route('folders.show', ['id' => $this->parentFolder->id]) :
                route('boxes.show', ['id' => $this->box->id]),
            ],
            'breadcrumbs' => $this->breadcrumbs(),
            'folders' => FolderResource::collection($this->folders),
            'files' => FileResource::collection($this->files),
        ];
    }
}
