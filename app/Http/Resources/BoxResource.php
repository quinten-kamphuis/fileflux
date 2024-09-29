<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoxResource extends JsonResource
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
            'links' => [
                'self' => route('boxes.show', ['id' => $this->id]),
            ],
            'breadcrumbs' => $this->breadcrumbs(),
        ];
    }
}
