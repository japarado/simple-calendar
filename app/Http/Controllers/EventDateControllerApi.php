<?php

namespace App\Http\Controllers;

use App\Models\EventDate;
use Illuminate\Http\Request;

class EventDateControllerApi extends Controller
{
    /* public function index() */
    /* { */
    /* } */

    /* public function create() */
    /* { */
    /* } */

    /* public function store(Request $request) */
    /* { */
    /* } */

    /* public function show($id) */
    /* { */
    /* } */

    /* public function edit($id) */
    /* { */
    /* } */

    /* public function update(Request $request, $id) */
    /* { */
    /* } */

    public function destroy($id)
    {
		$event_date = EventDate::find($id);
		$event_date->delete();

		$context = [
			'event' => $event_date
		];

		return response()->json($context);
    }
}
