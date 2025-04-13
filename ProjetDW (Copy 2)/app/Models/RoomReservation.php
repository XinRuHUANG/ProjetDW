<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Room;
use App\Models\User;

class RoomReservation extends Model
{
    protected $table = 'room_reservations';
    
    protected $primaryKey = 'id_reservation';

    protected $fillable = [
        'id_user',
        'id_room',
        'reservation_date',
        'start_time',
        'end_time',
        'purpose',
        'status',
    ];

    public $timestamps = true;
    
    public function room()
    {
        return $this->belongsTo(Room::class, 'id_room', 'id_room');
    }
    
    
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function seats()
    {
        return $this->belongsToMany(Seat::class, 'room_reservation_seat', 'id_reservation', 'id_seat');
    }
}
