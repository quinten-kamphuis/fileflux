<?php

namespace App\Models;

use App\Traits\HasBreadcrumbs;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory, HasUuids, HasBreadcrumbs;

    protected $fillable = [
        "box_id",
        "parent_folder_id",
        "owner_id",
        "name",
        "filename",
        "mime_type",
        "file_size",
        "path",
        "extension",
    ];

    function box()
    {
        return $this->belongsTo(Box::class, "box_id");
    }

    function parentFolder()
    {
        return $this->belongsTo(Folder::class, "parent_folder_id");
    }

    function owner()
    {
        return $this->belongsTo(User::class, "owner_id");
    }

    public function getType()
    {
        return 'file';
    }
}
