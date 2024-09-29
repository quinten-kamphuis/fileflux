<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FolderResource extends JsonResource
{
    protected $isChild = false;

    public function __construct($resource, $isChild = false)
    {
        parent::__construct($resource);
        $this->isChild = $isChild;
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'path' => $this->path,
            'owner' => new UserResource($this->owner),
            'boxId' => $this->box_id,
            'links' => [
                'self' => route('folders.show', ['id' => $this->id]),
                'parent' => $this->parentFolder ?
                    route('folders.show', ['id' => $this->parentFolder->id]) :
                    route('boxes.show', ['id' => $this->box->id]),
            ],
            'breadcrumbs' => $this->breadcrumbs(),
        ];

        if (!$this->isChild) {
            $data['folders'] = FolderResource::collection(
                $this->folders->map(function ($folder) {
                    return new FolderResource($folder, true);
                })
            );
            $data['files'] = FileResource::collection($this->files);
        }

        return $data;
    }
}
