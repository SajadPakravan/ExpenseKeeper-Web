<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    const string DEFAULT_AVATAR = '/images/icons/avatar.webp';
    protected $fillable = ['name', 'email', 'phone', 'avatar', 'role', 'user_id', 'ip_address', 'device', 'platform', 'login_at'];

    // مشخص کردن نوع فیلدهای جدول که مقدار آن فیلدها دقیقا با چه نوعی برگردد

    public function authCredential(): HasOne
    {
        return $this->hasOne(UserAuth::class);
    }

    public function sessionCredential(): HasMany
    {
        return $this->hasMany(UserSessions::class);
    }

    public function incomes(): HasMany
    {
        return $this->hasMany(Income::class);
    }

    protected function casts(): array
    {
        return [
            'deleted_at' => 'datetime',
        ];
    }
}
