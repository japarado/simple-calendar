<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Event;

class EventDate extends Model
{
    use HasFactory, SoftDeletes;

	protected $table = 'event_date';

	protected $fillable = [
		'date',
		'event_id'
	];

	public function event()
	{
		return $this->belongsTo(Event::class);
	}
}
