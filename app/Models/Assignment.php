<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Assignment
 *
 * The Assignment model represents an assignment in the system.
 *
 * An assignment is a task or set of tasks given to students as part of their course work.
 * Each assignment belongs to a specific sublesson and can have multiple tasks.
 * Students can complete assignments and make attempts at them.
 */
class Assignment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sublesson_id',
        'title',
        'markdown',
        'assignment_xp',
    ];

    /**
     * Get the sublesson that the assignment belongs to.
     *
     * @return BelongsTo The sublesson that the assignment belongs to.
     */
    public function sublesson(): BelongsTo
    {
        return $this->belongsTo(Sublesson::class);
    }

    /**
     * Get the tasks for the assignment.
     *
     * @return HasMany The tasks for the assignment.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Get the attempts for the assignment.
     *
     * @return HasMany The attempts for the assignment.
     */
    public function attempts(): HasMany
    {
        return $this->hasMany(Attempt::class);
    }

    /**
     * Get the successful attempts for the assignment.
     *
     * @return HasMany The successful attempts for the assignment.
     */
    public function successfulAttempts(): HasMany
    {
        return $this->hasMany(SuccessfulAttempt::class);
    }
}
