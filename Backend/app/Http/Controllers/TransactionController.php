<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\CategoryTransaction;
use App\Models\Transaction;
use App\Models\LimitCategory;

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
            $transactions = Transaction::where('user_id', $user->id)->where('month', $request->input('month'))->where('year', $request->input('year'))->get();

            // Calcular el balance
            $balance = 0;
            foreach ($transactions as $transaction) {
                if ($transaction->type == 'INCOME') {
                    $balance += $transaction->amount;
                } else {
                    $balance -= $transaction->amount;
                }
            }

            $income = Transaction::where('user_id', $user->id)->where('type', 'INCOME')->where('month', $request->input('month'))->where('year', $request->input('year'))->sum('amount');
            $expense = Transaction::where('user_id', $user->id)->where('type', 'EXPENSE')->where('month', $request->input('month'))->where('year', $request->input('year'))->sum('amount');

            return response()->json(['balance' => $balance, 'INCOME' => $income, 'EXPENSE' => $expense]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener el balance'], 500);
        }
    }

    public function get_transactions(Request $request)
    {
        try {
            $user = $request->user();
    
            // Obtener las transacciones con la relación de categoría
                    $transactions = Transaction::with('categoryTransaction')
                        ->where('user_id', $user->id)
                ->where('month', $request->input('month'))
                ->where('year', $request->input('year'))
                ->get();
    
            // Formatear la respuesta
            $transactions_array = [];
            foreach ($transactions as $transaction) {
                $category = CategoryTransaction::find($transaction->category_transaction_id);
                $transactions_array[] = [
                    'id' => $transaction->id,
                    'category' => $category->name,
                    'type' => $transaction->type,
                    'description' => $transaction->description,
                    'amount' => $transaction->amount,
                    'day' => $transaction->day,
                    'month' => $transaction->month,
                    'year' => $transaction->year
                ];
            }
    
            return response()->json($transactions_array);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las transacciones'], 500);
        }    
    }

    public function get_limits(Request $request)
    {
        try {
            $user = $request->user();

            $limits = LimitCategory::with('categoryTransaction')
                ->where('user_id', $user->id)
                ->get();
            $limits_array = [];
            foreach ($limits as $limit) {
                $category = CategoryTransaction::find($limit->category_transaction_id);
                $limits_array[] = [
                    'id' => $limit->id,
                    'category' => $category->name,
                    'limit' => $limit->limit
                ];
            }
            return response()->json($limits_array);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los límites: ' . $e], 500);
        }
    }

    public function add_limit(Request $request)
    {
        try {
            $user_id = $request->user()->id;
            $limit = new LimitCategory();
            $limit->user_id = $user_id;
            $limit->category_transaction_id = $request->input('category_transaction_id');
            $limit->limit = $request->input('limit');
            $limit->save();
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['error' => 'Error al agregar el límite'], 500);
        }
    }

    public function delete_limit(Request $request)
    {
        Log::info('delete_limit: ' . json_encode($request->all()));
        Log::info('user: ' . json_encode($request->user()));
        try {
            $user_id = $request->user()->id;
            $limit = LimitCategory::where('user_id', $user_id)->where('id', $request->input('limit_id'))->first();
            if ($limit) {
                $limit->delete();
                return response()->json(['message' => 'Límite eliminado correctamente']);
            } else {
                return response()->json(['error' => 'Límite no encontrado'], 404);
            }
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(['error' => 'Error al eliminar el límite'], 500);
        }
    }
}
