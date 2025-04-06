<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LibraryAttendanceController extends Controller
{
    public function recordAttendance(Request $request)
    {
        $hours = $request->validate(['hours' => 'required|numeric|min:0.5|max:24'])['hours'];
        
        auth()->user()->increment('library_hours', $hours);
        event(new UserActivity(auth()->user()));
        
        return back()->with('success', "{$hours}h enregistrées");
    }
}
