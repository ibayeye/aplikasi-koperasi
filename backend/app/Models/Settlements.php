<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Settlements extends Model
{
    use SoftDeletes;
    protected $table = 'settlements';
    protected $fillable = [
        'user_id',
        'loan_id',
        'amount',
        'proof',
        'status',
        'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function loan()
    {
        return $this->belongsTo(Loans::class);
    }

}
