import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = (props) => 
{
	return(
		<FullCalendar
			plugins={[dayGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			events={props.events}
			displayEventTime={false}
			eventClick={props.handleClickDate}
		/>
	);
};

export default Calendar;
