<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
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
            'folder_id' => 1,
            'owner_id' => 1,
            'file_path' => $this->faker->word,
            'file_size' => $this->faker->randomNumber(),
            'mime_type' => $this->faker->word
        ];
    }
}
