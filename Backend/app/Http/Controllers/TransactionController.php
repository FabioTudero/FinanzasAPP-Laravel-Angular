<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
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
        $user_id = $request->user()->id;
        try {
            $transaction = new Transaction();
            $transaction->user_id = $user_id;
            $transaction->category_transaction_id = $request->input('category_transaction_id');
            $transaction->type = $request->input('type');
            $transaction->description = $request->input('description');
            $transaction->amount = $request->input('amount');
            $transaction->day = $request->input('day');
            $transaction->month = $request->input('month');
            $transaction->year = $request->input('year');
            $transaction->save();
            return response()->json($transaction);
        } catch (\Exception $e) {
            Log::error($e);
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
                if ($transaction->type == 'INCOME') {
                    $balance += $transaction->amount;
                } else {
                    $balance -= $transaction->amount;
                }
            }

            $income = Transaction::where('user_id', $user->id)->where('type', 'INCOME')->sum('amount');
            $expense = Transaction::where('user_id', $user->id)->where('type', 'EXPENSE')->sum('amount');

            return response()->json(['balance' => $balance, 'INCOME' => $income, 'EXPENSE' => $expense]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener el balance'], 500);
        }
    }

    public function get_transactions(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = $request->user();

            // Obtener las transacciones del usuario
            $transactions = Transaction::where('user_id', $user->id)->get();

            return response()->json($transactions);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las transacciones'], 500);
        }
    }
}
