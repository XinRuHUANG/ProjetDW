<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorite extends Model
{
    protected $primaryKey = 'idFavorite';
    protected $table = 'favorites';
    
    protected $fillable = ['idUser', 'idBook'];
    
    public $timestamps = true;
    
    /**
     * Relation avec l'utilisateur
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'idUser');
    }
    
    /**
     * Relation avec le livre
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'idBook');
    }
}