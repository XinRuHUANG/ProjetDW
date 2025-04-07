<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = User::where('userType', '!=', 'Admin')->get(); // ou '3' si c'est codé comme ça

        return Inertia::render('Members/Index', [
            'members' => $members,
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('Members/Show', [
            'member' => $user,
        ]);
    }
}

