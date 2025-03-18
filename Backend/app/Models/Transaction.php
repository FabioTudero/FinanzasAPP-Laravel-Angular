<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'category_transaction_id',
        'amount',
        'description',
        'date',
    ];

    public function categoryTransaction()
    {
        return $this->belongsTo(CategoryTransaction::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
