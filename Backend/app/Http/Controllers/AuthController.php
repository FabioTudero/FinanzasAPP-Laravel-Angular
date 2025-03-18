<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('name', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['Las credencias son incorectas.']
            ], 404);
        }

        $token = $user->createToken('my-app-token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function register(Request $request)
    {
        if (User::where('name', $request->username)->first()) {
            return response([
                'message' => ['El nombre de usuario ya está en uso.']
            ], 404);
        }

        $user = User::create([
            'name' => $request->username,
            'password' => Hash::make($request->password)
        ]);
        
        $user->save();

        return response($user, 201);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return [
            'message' => 'Sesión cerrada.'
        ];
    }
}
