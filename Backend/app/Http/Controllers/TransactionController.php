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

    public function get_balance(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = $request->user();

            // Obtener las transacciones del usuario
            $transactions = Transaction::where('user_id', $user->id)->get();

            // Calcular el balance
            $balance = 0;
            foreach ($transactions as $transaction) {
                if ($transaction->type == 'income') {
                    $balance += $transaction->amount;
                } else {
                    $balance -= $transaction->amount;
                }
            }

            return response()->json(['balance' => $balance]);
        } catch (\Exception $e) {
            Log::error('Error al obtener el balance: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener el balance'], 500);
        }
    }
}
