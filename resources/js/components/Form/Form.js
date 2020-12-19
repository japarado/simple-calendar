import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = (props) => 
{
	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label htmlFor="event-name">Event Name</label>
						<input
							type="text"
							className="form-control"
							id="event-name"
							name="event-name"
							value={props.name}
							onChange={(e) => props.setName(e.target.value)}
							placeholder="Dinner Party"
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
							placeholder="Get together with Fran and Co. I've been assigned to bring the drinks."
							value={props.description}
							onChange={(e) => props.setDescription(e.target.value)}
						/>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-6">
						<div className="d-flex flex-column">
							<label htmlFor="start-date">Start Date</label>
							<DatePicker
								selected={props.startDate}
								onChange={(date) => props.setStartDate(date)}
								dateFormat="dd MMMM yyyy - E"
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
								dateFormat="dd MMMM yyyy - E"
								minDate={props.startDate}
								className="form-control"
								id="end-date"
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
									onClick={props.handleUpdateDay}
									disabled={!day.isAvailable}
									onChange={props.handleCheckDay}
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
					type="submit">{props.submitText ? props.submitText : "Submit"}</button>
			</form>
		</>
	);
};

export default Form;
