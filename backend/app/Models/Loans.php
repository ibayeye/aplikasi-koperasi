<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Loans extends Model
{
    use SoftDeletes;
    protected $table = 'loans';
    protected $fillable = [
        'user_id',
        'amount',
        'remaining_amount',
        'phone',
        'address',
        'date',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function settlements()
{
    return $this->hasMany(Settlements::class);
}
}
