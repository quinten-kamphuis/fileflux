<?php

namespace Database\Factories;

use App\Models\Box;
use App\Models\Folder;
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
            'filename' => $this->faker->word,
            'box_id' => function () {
                return Box::inRandomOrder()->first()->id ?? Box::factory()->create()->id;
            },
            'owner_id' => 1,
            'parent_folder_id' => null,
            'path' => $this->faker->word,
            'file_size' => $this->faker->randomNumber(),
            'mime_type' => $this->faker->word,
            'extension' => $this->faker->word,
        ];
    }

    public function inFolder(Folder $folder)
    {
        return $this->state(function (array $attributes) use ($folder) {
            return [
                'box_id' => $folder->box_id,
                'parent_folder_id' => $folder->id,
                'path' => $folder->path . '/' . ($attributes['name'] ?? $this->faker->word . '.' . $this->faker->fileExtension()),
            ];
        });
    }
}
