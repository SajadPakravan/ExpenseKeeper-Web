<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSessions extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'users_sessions';
    protected $fillable = ['user_id', 'ip_address', 'device', 'platform', 'login_at', 'logout_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return ['active' => 'boolean', 'login_at' => 'datetime', 'logout_at' => 'datetime'];
    }
}
