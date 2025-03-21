<?php

namespace Database\Seeders;

use App\Models\CategoryTransaction;
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

        CategoryTransaction::create(['name' => 'Salario'], ['name' => 'Alquiler'], ['name' => 'Comida'], ['name' => 'Transporte'], ['name' => 'Entretenimiento'], ['name' => 'Invesion'], ['name' => 'Otros']);
    }
}
