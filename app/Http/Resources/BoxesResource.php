<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoxesResource extends JsonResource
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
            'owner' => new UserResource($this->owner),
            'links' => ['self' => route('boxes.show', ['box' => $this->id])],
            'folderCount' => $this->getFolderCount(),
            'fileCount' => $this->getFileCount(),
        ];
    }
}
