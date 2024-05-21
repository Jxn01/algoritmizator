<?php

namespace Tests\Unit\Model;

use App\Models\Friendship;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FriendshipTest extends TestCase
{
    use RefreshDatabase;

    public function test_friendship_can_be_created_with_valid_data(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $friendship = Friendship::factory()->create([
            'party1' => $user1->id,
            'party2' => $user2->id,
        ]);

        $this->assertDatabaseHas('friendships', [
            'party1' => $user1->id,
            'party2' => $user2->id,
        ]);
    }

    public function test_friendship_belongs_to_user1_and_user2(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $friendship = Friendship::factory()->create([
            'party1' => $user1->id,
            'party2' => $user2->id,
        ]);

        $this->assertEquals($user1->id, $friendship->user1->id);
        $this->assertEquals($user2->id, $friendship->user2->id);
    }

    public function test_friendship_cannot_be_created_without_user1(): void
    {
        $this->expectException(QueryException::class);

        Friendship::factory()->create(['party1' => null]);
    }

    public function test_friendship_cannot_be_created_without_user2(): void
    {
        $this->expectException(QueryException::class);

        Friendship::factory()->create(['party2' => null]);
    }
}
