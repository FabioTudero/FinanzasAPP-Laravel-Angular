<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryTransaction extends Model
{
    protected $table = 'category_transactions';
    protected $fillable = ['name'];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
