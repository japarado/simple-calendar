import React, {Component} from "react";

import "./EditModal.scss";

import Modal from "react-bootstrap/Modal";
import Form from "../Form/Form";

import {eachDayOfInterval} from "date-fns";
import {createDayArray, prettifyDate} from "../../utils";

import {update} from "../../services/eventService";

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
		await this.props.handleSubmit(e);
	}

	render()
	{
		return(
			<Modal 
				show={this.props.show} 
				onHide={this.props.onHide}
				scrollable={true} 
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
				</Modal.Body> 

				<Modal.Footer> 
					<button
						className="btn btn-secondary"
						onClick={this.props.onHide}>Cancel</button>
				</Modal.Footer> 
			</Modal> 
		);
	}
}

export default EditModal;
