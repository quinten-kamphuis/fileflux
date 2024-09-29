<?php

namespace App\Models;

use App\Traits\HasBreadcrumbs;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Box extends Model
{
    use HasFactory, HasUuids, HasBreadcrumbs;

    protected $fillable = [
        'name',
        'owner_id',
    ];

    public function allFolders()
    {
        return $this->hasMany(Folder::class)->where('box_id', $this->id);
    }

    public function allFiles()
    {
        return $this->hasMany(File::class)->where('box_id', $this->id);
    }

    public function getFolderCount()
    {
        return $this->allFolders()->count();
    }

    public function getFileCount()
    {
        return $this->allFiles()->count();
    }

    public function folders()
    {
        return $this->hasMany(Folder::class, 'box_id')
            ->whereNull('parent_folder_id');
    }

    public function files()
    {
        return $this->hasMany(File::class, "box_id")
            ->whereNull('parent_folder_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function getType()
    {
        return 'box';
    }
}
