<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PointSystemTest extends TestCase
{
    // tests/Feature/PointSystemTest.php
    public function test_point_system_workflow()
    {
        $user = User::factory()->create(['points' => 0]);
        
        // Test ajout de points
        $user->addPoints(10, 'Inscription');
        $this->assertEquals(10, $user->points);
        
        // Test historique
        $this->assertDatabaseHas('point_histories', [
            'user_id' => $user->id,
            'points' => 10,
            'reason' => 'Inscription'
        ]);
        
        // Test déduction
        $user->addPoints(-5, 'Impression');
        $this->assertEquals(5, $user->refresh()->points);
        $user->update(['books_read' => 3]);
        event(new UserActivity($user));
        $this->assertEquals(20, $user->refresh()->points);
    }
}
