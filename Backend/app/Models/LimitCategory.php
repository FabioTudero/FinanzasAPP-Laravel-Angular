<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LimitCategory extends Model
{
    protected $fillable = [
        'user_id',
        'category_transaction_id',
        'limit',
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
