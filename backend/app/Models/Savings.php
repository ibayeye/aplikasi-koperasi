<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Savings extends Model
{
    use SoftDeletes;
    protected $table = 'savings';
    protected $fillable = [
        'user_id',
        'value',
        'date',
        'type',
        'bagi_hasil',
    ];

    public function user ()
    {
        return $this->belongsTo(User::class);
    }
}
