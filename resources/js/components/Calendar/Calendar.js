import React from "react";

import FullCalendar from "@fullcalendar/react";
import DayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => 
{
	return(
		<FullCalendar
			plugins={[DayGridPlugin]}
			initialView="dayGridMonth"
		/>
	);
};

export default Calendar;
