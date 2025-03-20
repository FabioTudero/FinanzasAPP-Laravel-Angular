<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategoryTransaction;

class TransactionController extends Controller
{
    public function get_categories(Request $request)
    {
        try {
            $categories = CategoryTransaction::all();
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las categorías'], 500);
        }
    }
}
