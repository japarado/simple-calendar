import {format} from "date-fns";

function createDayArray() 
{
	const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return dayNames.map((day, index) => ({
		label: day,
		value: index ,
		isAvailable: true,
		checked: false
	}));
}

function prettifyDate(date)
{
	return format(date, "dd MMMM yyyy - E");
}

export {createDayArray, prettifyDate};

