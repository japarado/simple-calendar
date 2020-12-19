<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventDateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_date', function (Blueprint $table) {
            $table->id();
			$table->dateTime('date');
			$table->foreignId('event_id')->constrained('event')->onDelete('cascade');
            $table->timestamps();
			$table->softDeletes();

			$table->index('date');
			$table->index('event_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_date');
    }
}
