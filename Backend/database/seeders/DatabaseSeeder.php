<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CategoryTransaction;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User::factory(10)->create();

        $categories = [
            'Salario',
            'Alquiler',
            'Comida',
            'Transporte',
            'Entretenimiento',
            'Inversión',
            'Otros'
        ];

        foreach ($categories as $category) {
            CategoryTransaction::create(['name' => $category]);
        }
    }
}
