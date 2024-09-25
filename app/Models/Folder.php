<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Folder extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name',
        'path',
        'parent_id',
        'owner_id',
    ];

    public function childFolders()
    {
        Log::info('Accessing childFolders for folder: ' . $this->id);
        return $this->hasMany(Folder::class, 'parent_id');
    }

    public function files()
    {
        return $this->hasMany(File::class, "folder_id");
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function isBox()
    {
        return $this->parent_id === null;
    }
}
