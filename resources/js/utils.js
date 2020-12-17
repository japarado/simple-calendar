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

export {createDayArray};
