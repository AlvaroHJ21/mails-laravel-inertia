<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        \App\Models\User::factory()->create([
            'name' => 'Alvaro',
            'username' => 'alvarohj', // Add 'username' to the fillable array
            'email' => 'alvaro@gmail.com',
            'password' => bcrypt('12345678')
        ]);


        \App\Models\User::factory()->create([
            'name' => 'Joel Lapa',
            'username' => 'joellapa',
            'email' => 'joel.lapa@datalabs.pe',
            'password' => bcrypt('DataLabs$2023')
        ]);

        \App\Models\BigQueryDev::factory(200)->create();
    }
}
