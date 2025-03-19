<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategoryTransaction;

class TransactionController extends Controller
{
    public function get_categories(Request $request)
    {
        $categories = CategoryTransaction::all();
        return response()->json([
            'categories' => $categories
        ]);
    }
}
