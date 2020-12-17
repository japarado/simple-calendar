import React, {useEffect, useState} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {eachDayOfInterval} from "date-fns";

import {createDayArray} from "../../utils";

const CalendarForm = (props) => 
{
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [days, setDays] = useState(createDayArray());

	useEffect(() => 
	{
		const eventDays = eachDayOfInterval({start: startDate, end: endDate}).map((day) => day.getDay());
		const availableDays = days.map((day) => 
		{
			if(eventDays.includes(day.value))
			{
				day.isAvailable = true;
			}
			else 
			{
				day.isAvailable = day.checked = false;
			}
			return day;
		});
		setDays(availableDays);
	}, [startDate, endDate]);

	// Handlers
	const handleUpdateStartDate = (date) => 
	{
		setStartDate(date);
	};

	const handleUpdateEndDate = (date) => 
	{
		setEndDate(date);
	};

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
		console.log(selectedDays);
		const event = {
			name: name,
			description: description,
			startDate,
			endDate,
		};
		props.handleSubmitCreate(event, e);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label htmlFor="event-name">Event Name</label>
						<input
							type="text"
							className="form-control"
							id="event-name"
							name="event-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required/>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-12">
						<label htmlFor="description">Description</label>
						<textarea
							className="form-control"
							id="description"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-6">
						<div className="d-flex flex-column">
							<label htmlFor="start-date">Start Date</label>
							<DatePicker
								selected={startDate}
								onChange={(date) => handleUpdateStartDate(date)}
								dateFormat="dd MMMM yyyy"
								maxDate={endDate}
								className="form-control"
								id="start-date"
							/>
						</div>
					</div>

					<div className="form-group col-md-6">
						<div className="d-flex flex-column">
							<label htmlFor="start-date">End Date</label>
							<DatePicker
								selected={endDate}
								onChange={(date) => handleUpdateEndDate(date)}
								dateFormat="dd MMMM yyyy"
								minDate={startDate}
								className="form-control"
								id="start-date"
							/>
						</div>
					</div>

					<div className="form-group">
						{days.map((day) => (
							<div
								className="form-check form-check-inline"
								key={day.label}>
								<input
									className="form-check-input"
									type="checkbox"
									id={day.label}
									name={day.label}
									value={day.value}
									onClick={props.handleUpdateDay}
									disabled={!day.isAvailable}
									onChange={handleCheckDay}
									checked={day.checked && day.isAvailable}
								/>
								<label
									className="form-check-label"
									htmlFor="sunday">{day.label}</label>
							</div>
						))}
					</div>
				</div>
				<button
					className="btn btn-primary"
					type="submit">Submit</button>
			</form>
		</>
	);
};

export default CalendarForm;
