import apiservice from "./service";

import {format} from "date-fns";

async function index()
{
	const events = await apiservice.get("/events");
	return events;
}

async function store(event)
{
	event.startDate = format(event.startDate, "y-MM-dd hh:mm:ss");
	event.endDate = format(event.endDate, "y-MM-dd hh:mm:ss");
	event.dates = event.dates.map((date) => format(date, "y-MM-dd hh:mm:ss"));
	const response = await apiservice.post("/events", event);
	return response;
}

async function update(id, event)
{
	event.startDate = format(event.startDate, "y-MM-dd hh:mm:ss");
	event.endDate = format(event.endDate, "y-MM-dd hh:mm:ss");
	event.dates = event.dates.map((date) => format(date, "y-MM-dd hh:mm:ss"));
	const response = await apiservice.patch(`/events/${id}`, event);
	return response;
}

async function destroy(id)
{
	const response = await apiservice.delete(`/events/${id}`);
	return response;
}

export {index, store, update, destroy};
