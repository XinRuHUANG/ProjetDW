<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Book;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Favorite;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'id_user';
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'last_name',
        'first_name',
        'email',
        'password',
        'age',
        'birthday',
        'gender',
        'photo_url',
        'id_user_type',
        'points',
        'books_read',
        'library_hours',
        'printed_pages'
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
        'birthday' => 'date',
        'email_verified_at' => 'datetime',
    ];

    /**
    * Relation many-to-many avec les livres favoris
    */
    public function favoriteBooks(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'favorites', 'id_user', 'idbook')
                ->using(Favorite::class)
                ->withTimestamps();
    }

    /**
     * Relation avec les livres empruntés
     */
    public function borrowedBooks(): HasMany
    {
        return $this->hasMany(Book::class, 'id_user');
    }

    /**
     * Relation avec les ordinateurs réservés
     */
    public function computers(): HasMany
    {
        return $this->hasMany(Computer::class, 'id_user');
    }
    
        /**
     * Calculer l'age à partir de la date de naissance
     */
    
    protected $appends = ['age'];

    public function getAgeAttribute()
    {
        return \Carbon\Carbon::parse($this->birthday)->age;
    }

    /**
     * Relation avec les tablettes réservées
     */
    public function tablets(): HasMany
    {
        return $this->hasMany(Tablet::class, 'id_user');
    }

    /**
     * Relation avec les sièges réservés
     */
    public function seats(): HasMany
    {
        return $this->hasMany(Seat::class, 'id_user');
    }

    /**
     * Relation avec les salles réservées
     */
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class, 'id_user');
    }

    /**
     * Vérifie si l'utilisateur est administrateur
     */
    public function isAdmin(): bool
    {
        return $this->id_user_type === '3';
    }

    /**
     * Ajoute des points à l'utilisateur
     */
    public function addPoints(int $points, string $reason)
    {
        $this->points += $points;
        $this->save();
        
        // Historique des points
        PointHistory::create([
            'user_id' => $this->id,
            'points' => $points,
            'reason' => $reason,
            'remaining_points' => $this->points
        ]);
    }

    public function pointHistories()
    {
        return $this->hasMany(PointHistory::class);
    }
}
