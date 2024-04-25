<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
    use HasFactory;

    protected $table = 'answers';

    protected $primaryKey = 'id';

    protected $fillable = [
        'description',
        'is_correct',
    ];

    public function question(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
