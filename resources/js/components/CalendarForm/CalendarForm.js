import React, {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CalendarForm = (props) => 
{
	return (
		<>
			<div className="form-row">
				<div className="form-group col-md-12">
					<label htmlFor="event-name">Event Name</label>
					<input
						type="text"
						className="form-control"
						id="event-name"
						name="event-name"
						required/>
				</div>
			</div>

			<div className="form-row">
				<div className="form-group col-md-12">
					<label htmlFor="description">Description</label>
					<textarea
						className="form-control"
						id="description"
						name="description"/>
				</div>
			</div>

			<div className="form-row">
				<div className="form-group col-md-6">
					<div className="d-flex flex-column">
						<label htmlFor="start-date">Start Date</label>
						<DatePicker
							selected={props.startDate}
							onChange={(date) => props.setStartDate(date)}
							dateFormat="dd MMMM yyyy"
							maxDate={props.endDate}
							className="form-control"
							id="start-date"
						/>
					</div>
				</div>

				<div className="form-group col-md-6">
					<div className="d-flex flex-column">
						<label htmlFor="start-date">End Date</label>
						<DatePicker
							selected={props.endDate}
							onChange={(date) => props.setEndDate(date)}
							dateFormat="dd MMMM yyyy"
							minDate={props.startDate}
							className="form-control"
							id="start-date"
						/>
					</div>
				</div>

				<div className="form-group">
					{props.days.map((day) => (
						<div
							className="form-check form-check-inline"
							key={day.label}>
							<input
								className="form-check-input"
								type="checkbox"
								id={day.label}
								name={day.label}
								value={day.value}
							/>
							<label
								className="form-check-label"
								htmlFor="sunday">{day.label}</label>
						</div>
					))}
				</div>
				{/* <div className="form-group"> */}
				{/* 	<div className="form-check form-check-inline"> */}
				{/* 		<input */}
				{/* 			className="form-check-input" */}
				{/* 			type="checkbox" */}
				{/* 			name="sunday" */}
				{/* 			id="sunday" */}
				{/* 			value="0"  /> */}
				{/* 		<label */}
				{/* 			className="form-check-label" */}
				{/* 			htmlFor="sunday">Sun</label> */}
				{/* 	</div> */}
				{/* 	<div className="form-check form-check-inline"> */}
				{/* 		<input */}
				{/* 			className="form-check-input" */}
				{/* 			type="checkbox" */}
				{/* 			name="sunday" */}
				{/* 			id="sunday" */}
				{/* 			value="0"  /> */}
				{/* 		<label */}
				{/* 			className="form-check-label" */}
				{/* 			htmlFor="sunday">Sun</label> */}
				{/* 	</div> */}
				{/* 	<div className="form-check form-check-inline"> */}
				{/* 		<input */}
				{/* 			className="form-check-input" */}
				{/* 			type="checkbox" */}
				{/* 			name="sunday" */}
				{/* 			id="sunday" */}
				{/* 			value="0"  /> */}
				{/* 		<label */}
				{/* 			className="form-check-label" */}
				{/* 			htmlFor="sunday">Sun</label> */}
				{/* 	</div> */}
				{/* 	<div className="form-check form-check-inline"> */}
				{/* 		<input */}
				{/* 			className="form-check-input" */}
				{/* 			type="checkbox" */}
				{/* 			name="sunday" */}
				{/* 			id="sunday" */}
				{/* 			value="0"  /> */}
				{/* 		<label */}
				{/* 			className="form-check-label" */}
				{/* 			htmlFor="sunday">Sun</label> */}
				{/* 	</div> */}
				{/* 	<div className="form-check form-check-inline"> */}
				{/* 		<input */}
				{/* 			className="form-check-input" */}
				{/* 			type="checkbox" */}
				{/* 			name="sunday" */}
				{/* 			id="sunday" */}
				{/* 			value="0"  /> */}
				{/* 		<label */}
				{/* 			className="form-check-label" */}
				{/* 			htmlFor="sunday">Sun</label> */}
				{/* 	</div> */}
				{/* 	<div className="form-check form-check-inline"> */}
				{/* 		<input */}
				{/* 			className="form-check-input" */}
				{/* 			type="checkbox" */}
				{/* 			name="sunday" */}
				{/* 			id="sunday" */}
				{/* 			value="0"  /> */}
				{/* 		<label */}
				{/* 			className="form-check-label" */}
				{/* 			htmlFor="sunday">Sun</label> */}
				{/* 	</div> */}
				{/* 	<div className="form-check form-check-inline"> */}
				{/* 		<input */}
				{/* 			className="form-check-input" */}
				{/* 			type="checkbox" */}
				{/* 			name="sunday" */}
				{/* 			id="sunday" */}
				{/* 			value="0" */}
				{/* 		/> */}
				{/* 		<label */}
				{/* 			className="form-check-label" */}
				{/* 			htmlFor="sunday">Sun</label> */}
				{/* 	</div> */}
				{/* </div> */}

			</div>
		</>
	);
};

export default CalendarForm;
