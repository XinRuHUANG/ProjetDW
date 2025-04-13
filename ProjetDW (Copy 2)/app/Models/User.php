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
use App\Models\BorrowRecord;
use App\Models\EquipmentUsage;
use App\Models\RoomReservation;

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
        'birthday' => 'date',
        'email_verified_at' => 'datetime',
    ];

    /**
    * Relation many-to-many avec les livres favoris
    */
    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'id_user', 'id_book');
    }

    public function emprunts()
    {
        return $this->hasMany(BorrowRecord::class , 'id_user', 'id_book');
    }

    public function usage()
    {
        return $this->hasMany(EquipmentUsage::class, 'id_user', 'id_user');
    }
    
    public function reservations()
    {
        return $this->hasMany(RoomReservation::class);
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
    public function addPoints(int $points): void
    {
       $this->increment('points', $points);
    }
    


public function borrowedBooks()
{
    return $this->hasMany(BorrowRecord::class, 'id_user');
}
}
