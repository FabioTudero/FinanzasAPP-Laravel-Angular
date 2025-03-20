<?php

namespace App\Http\Controllers;

use \Log;
use Illuminate\Http\Request;
use App\Models\CategoryTransaction;
use App\Models\Transaction;

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

    public function add_transaction(Request $request)
    {
        try {
            $transaction = new Transaction();
            $transaction->user_id = $request->user_id;
            $transaction->category_transaction_id = $request->category_transaction_id;
            $transaction->type = $request->type;
            $transaction->description = $request->description;
            $transaction->amount = $request->amount;
            $transaction->date = $request->date;
            $transaction->save();
            return response()->json($transaction);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Error al agregar la transacción'], 500);
        }
    }
}
