import React, {useEffect, useState} from "react";

import "react-datepicker/dist/react-datepicker.css";

import {eachDayOfInterval} from "date-fns";

import {createDayArray} from "../../utils";
import Form from "../Form/Form";

/**
 * @typedef {Object} ChangeEvent
 * @typedef {Object} SubmitEvent
 */

const SideMenu = (props) => 
{
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState(new Date(new Date().setHours(0,0,0,0)));
	const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 6));
	const [days, setDays] = useState(createDayArray());

	/**
	 * Changes the state of the checkboxes whenever the date range is udpated
	 *
	 * Checkboxes may become un/checked and dis/en-abled according to the selected dates
	 */
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

	/**
	 * Handles the day states according to the changed tick boxes
	 *
	 * @param {Object} ChangeEvent
	 */
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

	/**
	 * Handles the submission of a new event and calls the handleSubmitCreate prop.
	 * In this case said prop refreshes the events
	 *
	 * @param {Object} SubmitEvent
	*/
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
