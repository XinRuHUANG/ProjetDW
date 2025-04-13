<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BorrowRecord extends Model
{
    protected $table = 'borrow_records';

    protected $primaryKey = 'id_borrow';

    protected $fillable = [
        'id_book',
        'id_user',
        'borrow_date',
        'due_date',
        'status',
        'notes',
    ];

    public $timestamps = true;
    
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function book()
    {
        return $this->belongsTo(Book::class, 'id_book');
    }
    
    
}

