<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;

use App\Models\User;
use Auth;

class AuthController extends Controller
{
    function signup(SignupRequest $request){
        $data = $request->validated();

        /**
         * @var \App\Models\User $User
         * 
         */

        $user =  User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    function login(LoginRequest $request){
        $credetial = $request->validated();

        if(!Auth::attempt($credetial)){
            return response([
                'message' => 'invalid email and password' 
            ]);
        }

        /**
         * @var \App\Models\User $User
         */

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    function logout(Request $request){
        /**
         * @var \App\Models\User $User
         * 
         */
        $user = $request->user();
        $user->currentAccessToken->delete();
        return response('',204);
    }
}
