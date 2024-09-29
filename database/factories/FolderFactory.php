<?php

namespace Database\Factories;

use App\Models\Box;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Folder>
 */
class FolderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'box_id' => function () {
                return Box::inRandomOrder()->first()->id ?? Box::factory()->create()->id;
            },
            'parent_folder_id' => null,
            'owner_id' => 1,
        ];
    }
}
