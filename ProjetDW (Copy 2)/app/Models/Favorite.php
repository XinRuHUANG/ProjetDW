<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorite extends Model
{
    protected $primaryKey = 'id_favorite';
    protected $table = 'favorites';
    
    protected $fillable = ['id_user', 'id_book'];
    
    public $timestamps = false;
    
    /**
     * Relation avec l'utilisateur
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    
    /**
     * Relation avec le livre
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'id_book');
    }
}
