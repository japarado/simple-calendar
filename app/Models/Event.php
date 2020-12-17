<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes;

	protected $table = 'event';

	protected $fillable = [
		'name',
		'description',
		'start',
		'end'
	];

	public function dates() 
	{
		return $this->hasMany(EventDate::class);
	}
}
