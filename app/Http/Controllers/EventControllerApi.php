<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventDate;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use DateTimeZone;
use Illuminate\Http\Request;

class EventControllerApi extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::with('dates')->get();

        $context = [
            'events' => $events
        ];

        return response()->json($context);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		$name = $request->input('name');
		$desc = $request->input('description');
		$start_date = $request->input('startDate');
		$end_date = $request->input('endDate');
		$dates = $request->input('dates');

		$event = Event::create([
			'name' => $name,
			'description' => $desc,
		]);

		$event_dates = array_map(function($date) {
			return new EventDate(['date' => $date]);
		}, $dates);

		$event->dates()->saveMany($event_dates);

        $context = [
			'name' => $name,
			'desc' => $desc,
			'start_date' => $start_date,
			'end_date' => $end_date,
			'dates' => $dates,
        ];
        return response()->json($context);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
