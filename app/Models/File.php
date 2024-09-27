<?php

namespace App\Models;

use App\HasBreadcrumbs;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory, HasUuids, HasBreadcrumbs;

    function box()
    {
        return $this->belongsTo(Box::class, "box_id");
    }

    function folder()
    {
        return $this->belongsTo(Folder::class, "parent_folder_id");
    }

    function owner()
    {
        return $this->belongsTo(User::class, "owner_id");
    }
}
