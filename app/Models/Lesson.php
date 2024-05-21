<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Lesson
 *
 * The Lesson model represents a lesson in the system.
 *
 * Each lesson can have a title and a description.
 * A lesson can have one assignment and multiple completed lessons.
 */
class Lesson extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
    ];

    /**
     * Find a lesson by its title.
     */
    public static function findLessonByTitle(string $title): ?Lesson
    {
        return self::where('title', $title)->first();
    }

    /**
     * Get the sublessons for the lesson.
     */
    public function sublessons(): HasMany
    {
        return $this->hasMany(Sublesson::class);
    }
}
