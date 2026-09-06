<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAuth extends Model
{
    use HasFactory;

    protected $table = 'users_auth';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'username',
        'password',
        'logged',
        'last_login_at',
        'last_logout_at',
    ];

    protected $hidden = ['password'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return ['password' => 'hashed', 'logged' => 'boolean'];
    }
}
