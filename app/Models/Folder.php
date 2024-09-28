<?php

namespace App\Models;

use App\HasBreadcrumbs;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Folder extends Model
{
    use HasFactory, HasUuids, HasBreadcrumbs;

    protected $fillable = [
        'name',
        'parent_folder_id',
        'owner_id',
        'box_id',
    ];

    public function box()
    {
        return $this->belongsTo(Box::class, "box_id");
    }

    public function parentFolder()
    {
        return $this->belongsTo(Folder::class, 'parent_folder_id');
    }

    public function folders()
    {
        return $this->hasMany(Folder::class, 'parent_folder_id');
    }

    public function files()
    {
        return $this->hasMany(File::class, 'parent_folder_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function breadcrumb()
    {
        $breadcrumb = collect([$this]);
        $parent = $this->parentFolder;

        while ($parent) {
            $breadcrumb->prepend($parent);
            $parent = $parent->parent;
        }

        return $breadcrumb;
    }
}
