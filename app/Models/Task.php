<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Task
 *
 * The Task model represents a task in the system.
 *
 * Each task is associated with a specific assignment.
 * The Task records the type, title, and description of the task.
 */
class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'assignment_id',
        'type',
        'title',
        'markdown',
    ];

    /**
     * Get the questions associated with the task.
     *
     * @return HasMany The questions associated with the task.
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    /**
     * Get the assignment that the task is associated with.
     *
     * @return BelongsTo The assignment that the task is associated with.
     */
    public function assignment(): BelongsTo
    {
        return $this->belongsTo(Assignment::class);
    }
}
