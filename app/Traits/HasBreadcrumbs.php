<?php

namespace App\Traits;

trait HasBreadcrumbs
{
    public function breadcrumbs()
    {
        $breadcrumbs = [];
        $currentItem = $this;

        // Add the current item (file, folder, or box)
        $breadcrumbs[] = [
            'id' => $this->id,
            'name' => $this->name,
        ];

        // Traverse up through parent folders if applicable
        while (
            method_exists($currentItem, 'parentFolder') &&
            $currentItem->parentFolder !== null
        ) {
            $folder = $currentItem->parentFolder;
            $breadcrumbs[] = [
                'id' => $folder->id,
                'name' => $folder->name,
                'link' => route('folders.show', ['id' => $folder->id])
            ];
            $currentItem = $folder;
        }

        // Add the box as the final (top-level) item if applicable
        if (method_exists($this, 'box')) {
            $box = $this->box;
            $breadcrumbs[] = [
                'id' => $box->id,
                'name' => $box->name,
                'link' => route('boxes.show', ['id' => $box->id])
            ];
        }

        // Add a link to the boxes index
        $breadcrumbs[] = [
            'id' => null,
            'name' => 'Boxes',
            'link' => route('boxes.index')
        ];

        // Reverse the array so it goes from box to file/folder
        return array_reverse($breadcrumbs);
    }
}
