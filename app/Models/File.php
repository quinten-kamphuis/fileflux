<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    use HasUuids;

    function folder()
    {
        return $this->belongsTo(Folder::class, "folder_id");
    }

    function owner()
    {
        return $this->belongsTo(User::class, "owner_id");
    }
}
