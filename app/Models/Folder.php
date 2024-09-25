<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;
    use HasUuids;

    public function files()
    {
        return $this->hasMany(related: File::class);
    }

    public function parent()
    {
        return $this->belongsTo(related: Folder::class, foreignKey: 'parent_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
