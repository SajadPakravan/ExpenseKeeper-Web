<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory;

    protected $table = 'expenses';

    protected $fillable = [
        'title',
        'amount',
        'type',
        'permanent_type',
        'permanent_day',
        'permanent_month',
        'permanent_time',
        'temporary_at',
        'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'amount' => 'integer',
            'permanent_day' => 'integer',
            'permanent_month' => 'integer',
            'permanent_time' => 'string',
            'temporary_at' => 'timestamp',
        ];
    }
}
