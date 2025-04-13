<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BorrowRecord;
use Carbon\Carbon;

class BorrowController extends Controller
{
    
public function store(Request $request)
{ $user = auth()->user();
    BorrowRecord::create([
        'id_user' => auth()->id(),
        'id_book' => $request->id_book,
        'borrow_date' => Carbon::now(),
        'due_date' => Carbon::now()->addWeeks(2),
        'status' => 'Borrowed',
    ]);
    
    $user->increment('points', 5);
    
    return back()->with('success', 'Livre emprunté !');
}
}
