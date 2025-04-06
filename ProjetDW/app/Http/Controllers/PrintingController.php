<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrintingController extends Controller
{
    // app/Http/Controllers/PrintingController.php
    public function recordPrint(Request $request)
    {
        $pages = $request->validate(['pages' => 'required|integer|min:1'])['pages'];
        
        $user = auth()->user();
        $user->increment('printed_pages', $pages);
        event(new UserActivity($user));
        
        return back()->with('success', "{$pages} pages imprimées enregistrées");
    }
}
