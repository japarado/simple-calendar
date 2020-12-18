import React from "react";

import FullCalendar from "@fullcalendar/react";
import DayGridPlugin from "@fullcalendar/daygrid";

const Calendar = (props) => 
{
	return(
		<FullCalendar
			plugins={[DayGridPlugin]}
			initialView="dayGridMonth"
			events={props.events}
		/>
	);
};

export default Calendar;
