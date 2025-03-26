<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Book;
use App\Models\Favorite;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'idUser';
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'lastName',
        'firstName',
        'email',
        'password',
        'age',
        'birthDate',
        'gender',
        'photoURL',
        'userType',
        'points'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birthDate' => 'date',
        'email_verified_at' => 'datetime',
    ];

    /**
    * Relation many-to-many avec les livres favoris
    */
    public function favoriteBooks(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'favorites', 'idUser', 'idBook')
                ->using(Favorite::class)
                ->withTimestamps();
    }

    /**
     * Relation avec les livres empruntés
     */
    public function borrowedBooks(): HasMany
    {
        return $this->hasMany(Book::class, 'idUser');
    }

    /**
     * Relation avec les ordinateurs réservés
     */
    public function computers(): HasMany
    {
        return $this->hasMany(Computer::class, 'idUser');
    }

    /**
     * Relation avec les tablettes réservées
     */
    public function tablets(): HasMany
    {
        return $this->hasMany(Tablet::class, 'idUser');
    }

    /**
     * Relation avec les sièges réservés
     */
    public function seats(): HasMany
    {
        return $this->hasMany(Seat::class, 'idUser');
    }

    /**
     * Relation avec les salles réservées
     */
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class, 'idUser');
    }

    /**
     * Vérifie si l'utilisateur est administrateur
     */
    public function isAdmin(): bool
    {
        return $this->userType === 'Admin';
    }

    /**
     * Ajoute des points à l'utilisateur
     */
    public function addPoints(int $points): void
    {
        $this->points += $points;
        $this->save();
    }
}