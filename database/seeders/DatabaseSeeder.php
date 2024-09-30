<?php

namespace Database\Seeders;

use App\Models\Box;
use App\Models\File;
use App\Models\Folder;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Box::factory()
            ->create()
            ->each(function ($box) {
                Folder::factory()
                    ->count(200)
                    ->for($box)
                    ->create();

                File::factory()
                    ->count(200)
                    ->for($box)
                    ->create();
            });


        // Box::factory()
        //     ->count(3)
        //     ->create()
        //     ->each(function ($box) {
        //         // Create folders for this box
        //         Folder::factory()
        //             ->count(4)
        //             ->for($box)
        //             ->create()
        //             ->each(function ($folder) {
        //                 // Create files in this folder
        //                 File::factory()
        //                     ->count(2)
        //                     ->inFolder($folder)
        //                     ->create();
        //             });

        //         // Create files directly in the box (no parent folder)
        //         File::factory()
        //             ->count(5)
        //             ->for($box)
        //             ->create();
        //     });
    }
}
