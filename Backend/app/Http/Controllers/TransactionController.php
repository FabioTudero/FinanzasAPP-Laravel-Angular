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
        Log::info($request->all());
        try {
            $transaction = new Transaction();
            $transaction->user_id = $request->input('transaction.user_id');
            $transaction->category_transaction_id = $request->input('transaction.category_transaction_id');
            $transaction->type = (string) $request->input('transaction.type');
            $transaction->description = $request->input('transaction.description');
            $transaction->amount = $request->input('transaction.amount');
            $transaction->day = $request->input('transaction.day');
            $transaction->month = $request->input('transaction.month');
            $transaction->year = $request->input('transaction.year');
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
                if ($transaction->type == 'income') {
                    $balance += $transaction->amount;
                } else {
                    $balance -= $transaction->amount;
                }
            }

            $income = Transaction::where('user_id', $user->id)->where('type', 'income')->sum('amount');
            $expense = Transaction::where('user_id', $user->id)->where('type', 'expense')->sum('amount');

            return response()->json(['balance' => $balance, 'income' => $income, 'expense' => $expense]);
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
