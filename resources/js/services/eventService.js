import apiservice from "./service";

async function index()
{
	const events = await apiservice.get("/events");
	console.log(events);
}

export {index};
