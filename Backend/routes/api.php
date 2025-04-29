<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/* AUTH */
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
/* AUTH */

/* TRANSACTION */
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/get-categories', [TransactionController::class, 'get_categories']);
    Route::post('/add-transaction', [TransactionController::class, 'add_transaction']);
    Route::get('/get-balance', [TransactionController::class, 'get_balance']);
    Route::get('/get-transactions', [TransactionController::class, 'get_transactions']);
    Route::post('/add-limit', [TransactionController::class, 'add_limit']);
});
/* TRANSACTION */
