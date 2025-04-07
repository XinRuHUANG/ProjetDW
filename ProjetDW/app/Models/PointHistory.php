<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PointHistory extends Model
{
    protected $fillable = [
        'user_id',
        'points',
        'reason',
        'remaining_points'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'points' => 'required|integer',
            'reason' => 'required|string|max:255',
            'remaining_points' => 'required|integer'
        ];
    }
}

