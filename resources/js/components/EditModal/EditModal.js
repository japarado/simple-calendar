import React, {Component} from "react";

import "./EditModal.scss";

import Modal from "react-bootstrap/Modal";
import Form from "../Form/Form";

import {toast} from "react-toastify";

import {eachDayOfInterval, format} from "date-fns";
import {createDayArray, prettifyDate} from "../../utils";

import {update, destroy as destroyEvent} from "../../services/eventService";
import {destroy as destroyEventDate} from "../../services/eventDateService";

/**
 * @typedef {Object} ChangeEvent
 * @typedef {Object} SubmitEvent
 */

class EditModal extends Component
{
	state = {
		eventId: undefined,
		dateId: undefined,
		name: "",
		description: "",
		startDate: new Date(),
		endDate: new Date(),
		eventDate: new Date(),
		dates: [],
		days: [],
	}

	componentDidMount()
	{
		this.setState({
			eventId: this.props.eventId,
			dateId: this.props.dateId,
			name: this.props.name,
			description: this.props.description,
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			eventDate: this.props.eventDate,
			dates: this.props.dates,
			days: createDayArray(),
		}, () => this.setDayStates());
	}

	/**
	 * Un/checks and dis/en-ables the day checkboxes according to the event dates 
	 */
	setDayStates()
	{
		const selectedEventDays = Array.from(new Set(this.state.dates.map((date) => date.getDay())));
		const availableEventDays = Array.from(new Set(eachDayOfInterval({start: this.state.startDate, end: this.state.endDate}).map((date) => date.getDay())));

		const days = createDayArray().map((dayObj) => 
		{
			if(selectedEventDays.includes(dayObj.value))
			{
				dayObj.checked = true;
				dayObj.isAvailable = true;
			}
			else 
			{
				dayObj.checked = false;
			}

			if(availableEventDays.includes(dayObj.value))
			{
				dayObj.isAvailable = true;
			}
			else 
			{
				dayObj.isAvailable = false;
			}

			return dayObj;
		});
		this.setState({days});
	}

	// adjustDays()
	// {
	// 	const eventDays = eachDayOfInterval({start: this.state.startDate, end: this.state.endDate}).map((day) => day.getDay());
	// 	const availableDays = this.state.days.map((day) => 
	// 	{
	// 		if(eventDays.includes(day.value))
	// 		{
	// 			day.isAvailable = day.checked = true;
	// 		}
	// 		else 
	// 		{
	// 			day.isAvailable = day.checked = false;
	// 		}
	// 		return day;
	// 	});
	// 	this.setState({days: availableDays});
	// }

	handleUpdateName = (name) => this.setState(({name}))

	handleUpdateDescription = (description) => this.setState({description})

	handleUpdateStartDate = (date) => this.setState({startDate: date}, () => this.setDayStates());

	handleUpdateEndDate = (date) => this.setState({endDate: date}, () => this.setDayStates());

	/**
	 * Adjusts the state based on the un/checked day checkboxes
	 *
	 * @param {ChangeEvent} e
	 */
	handleCheckDay = (e) => 
	{
		const updatedDays = this.state.days.map((day) => 
		{
			if(day.value === parseInt(e.target.value))
			{
				day.checked = e.target.checked;
			}
			return day;
		});
		this.setState({days: updatedDays});
	};

	/**
	 * Updates the event via the event service module and calls the handleSubmit prop.
	 * In this case, said prop refreshes the event list and closes the modal
	 *
	 * @param {SubmitEvent} e
	*/
	handleSubmit = async (e) => 
	{
		e.preventDefault();
		const selectedDays = this.state.days.filter((day) => day.checked).map((day) => day.value);
		const event = {
			name: this.state.name,
			description: this.state.description,
			dates: [],
			startDate: this.state.startDate,
			endDate: this.state.endDate
		};

		eachDayOfInterval({start: this.state.startDate, end: this.state.endDate}).forEach((date) => 
		{
			if(selectedDays.includes(date.getDay()))
			{
				event.dates.push(date);
			}
		});
		await update(this.state.eventId, event);
		toast.info(`Event '${this.state.name}' updated`);
		await this.props.handleSubmit();
	}

	/**
	 * Deletes the event via the event service module and calls the handleSubmit prop.
	 * In this case, said prop refreshes the event list and closes the modal
	 */
	handleDeleteEvent = async () =>
	{
		await destroyEvent(this.state.eventId);
		toast.warning(`Deleted '${this.state.name}'`);
		await this.props.handleSubmit();
	}

	/**
	 * Deletes the event date via the event service module and calls the handleSubmit prop.
	 * In this case, said prop refreshes the event list and closes the modal
	 */
	handleDeleteEventDate = async () => 
	{
		await destroyEventDate(this.state.dateId);
		toast.warning(`Event '${this.props.name}' removed from ${format(this.state.eventDate, "dd MMMM yyyy - E")}`);
		await this.props.handleSubmit();
	}

	render()
	{
		return(
			<Modal 
				show={this.props.show} 
				onHide={this.props.onHide}
				scrollable={false} 
				backdrop={true} 
			> 
				<Modal.Header> 
					<div className="d-flex flex-column">
						<h1>{this.state.name}</h1>
						<h5>{prettifyDate(this.state.eventDate)}</h5>
					</div>
				</Modal.Header> 

				{/* TODO: Unify all these props into a single object */}
				<Modal.Body> 
					<div className="mb-3">
						<Form
							name={this.state.name}
							description={this.state.description}
							startDate={this.state.startDate}
							endDate={this.state.endDate}
							days={this.state.days}
							setName={this.handleUpdateName}
							setDescription={this.handleUpdateDescription}
							setStartDate={this.handleUpdateStartDate}
							setEndDate={this.handleUpdateEndDate}
							handleSubmit={this.handleSubmit}
							handleCheckDay={this.handleCheckDay}
							submitText={"Save Changes"}
						/>
					</div>
				</Modal.Body> 

				<Modal.Footer> 
					<div className="d-flex flex-column">
						<button
							className="btn btn-secondary"
							onClick={this.props.onHide}>Cancel</button>
						<div className="flex mt-5">
							<button
								className="btn btn-warning mr-5"
								onClick={this.handleDeleteEventDate}>Delete this event date</button>
							<button
								className="btn btn-danger"
								onClick={this.handleDeleteEvent}>Delete this Event</button>
						</div>
					</div>
				</Modal.Footer> 
			</Modal> 
		);
	}
}

export default EditModal;
