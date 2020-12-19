import React, {useEffect, useState} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {eachDayOfInterval} from "date-fns";

import {createDayArray} from "../../utils";
import Form from "../Form/Form";

const SideMenu = (props) => 
{
	const [name, setName] = useState("Sample Event");
	const [description, setDescription] = useState("This is the best event there is!");
	const [startDate, setStartDate] = useState(new Date(new Date().setHours(0,0,0,0)));
	const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5));
	const [days, setDays] = useState(createDayArray());

	useEffect(() => 
	{
		const eventDays = eachDayOfInterval({start: startDate, end: endDate}).map((day) => day.getDay());
		const availableDays = days.map((day) => 
		{
			if(eventDays.includes(day.value))
			{
				day.isAvailable = day.checked = true;
			}
			else 
			{
				day.isAvailable = day.checked = false;
			}
			return day;
		});
		setDays(availableDays);
	}, [startDate, endDate]);

	const handleCheckDay = (e) => 
	{
		const updatedDays = days.map((day) => 
		{
			if(day.value === parseInt(e.target.value))
			{
				day.checked = e.target.checked;
			}
			return day;
		});
		setDays(updatedDays);
	};

	const handleSubmit = (e) => 
	{
		const selectedDays = days.filter((day) => day.checked).map((day) => day.value);
		const event = {
			name,
			description,
			dates: [],
			startDate,
			endDate
		};

		eachDayOfInterval({start: startDate, end: endDate}).forEach((date) => 
		{
			if(selectedDays.includes(date.getDay()))
			{
				event.dates.push(date);
			}
		});
		props.handleSubmitCreate(event, e);
	};

	return (
		<>
			<Form
				{...{
					name,
					description,
					startDate,
					endDate, 
					days,
					setName,
					setDescription,
					setStartDate,
					setEndDate,
					handleSubmit,
					handleCheckDay
				}}
			/>
		</>
	);
};

export default SideMenu;
