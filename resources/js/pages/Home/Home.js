import React, {Component} from "react";

import Navbar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import Calendar from "../../components/Calendar/Calendar";
import EditModal from "../../components/EditModal/EditModal";

import {store, index} from "../../services/eventService";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * @typedef {Object} ClickEvent
 * @typedef {Object} ChangeEvent
 * @typedef {Object} SubmitEvent
 */

class Home extends Component
{
	state = {
		events: [],
		isModalOpen: false,
		event: {}
	};

	async componentDidMount()
	{
		this.refreshEvents();
	}

	/**
	 * Retrieves and returns all events via the event service module
	 *
	 * @returns {Object[]} Events
	 */
	async fetchEvents()
	{
		let events = [];
		try 
		{
			events = await index();
		}
		catch(e)
		{
			console.log(e);
			alert("Error fetching events");
		}
		return events;
	}

	/**
	 * Accepts and saves an event via the event service module
	 *
	 * @param {Object} Event
	 * @returns {Promise<Object>} Saved event
	 */
	async storeEvent(event)
	{
		let returnValue = undefined;
		try 
		{
			returnValue = await store(event);
		}
		catch(e)
		{
			console.log(e);
			alert("Error saving event");
		}
		return returnValue;
	}

	/**
	 * Retrieves all events via the event service module and sets it to the state 
	 */
	async refreshEvents()
	{
		const res = await this.fetchEvents();
		const processedEvents = this.processEvents(res.data.events);
		this.setState({events: processedEvents});
	}

	/**
	 * Readies the event objects for usage in the FullCalendar component
	 *
	 * @param {Object[]} events
	 * @returns {Object[]} Events
	 */
	processEvents(events)
	{
		const processedEvents = [];
		events.forEach((event) => 
		{
			event.dates.forEach((date) => 
			{
				processedEvents.push({
					title: event.name,
					date: date.date,
					extendedProps: {
						description: event.description,
						eventId: event.id,
						dateId: date.id,
						startDate: event.dates[0].date,
						endDate: event.dates[event.dates.length - 1].date,
						dates: event.dates.map((date) => date.date)
					}
				});
			});
		});
		return processedEvents;
	}

	/**
	 * Saves the passed event object and refreshes the event list 
	 *
	 * @param {Object} event
	 * @param {SubmitEvent} e
	 */
	handleSubmitCreate = async (event, e) => 
	{
		e.preventDefault();
		await store(event);
		toast.success(`Created '${event.name}'`);
		await this.refreshEvents();
	}

	/**
	 * Closes the edit modal and refreshes the event list 
	 */
	handleSubmitEdit = async () => 
	{
		this.setState({isModalOpen: false});
		await this.refreshEvents();
	}

	/**
	 * Opens the modal for editing an event. Fires when clicking an event on the calendar
	 *
	 * @param {Object} arg The event object passed by FullCalendar
	 */
	handleClickEvent = (arg) => 
	{
		const event = {
			eventDate: arg.event.start,
			eventId: arg.event.extendedProps.eventId,
			dateId: arg.event.extendedProps.dateId,
			name: arg.event.title,
			description: arg.event.extendedProps.description,
			startDate: new Date(arg.event.extendedProps.startDate),
			endDate: new Date(arg.event.extendedProps.endDate),
			dates: arg.event.extendedProps.dates.map((date) => new Date(date))
		};
		this.setState({isModalOpen: true, event});
	}

	/**
	 * Hides the event edit modal 
	 */
	handleHideModal = () => this.setState({isModalOpen: false});

	/** 
	 * Shows the event edit modal 
	 */
	handleShowModal = () => this.setState({isModalOpen: true});

	render() 
	{
		return (
			<>
				<Navbar/>

				{this.state.isModalOpen ? 
					(
						<EditModal 
							eventId={this.state.event.eventId}
							dateId={this.state.event.dateId}
							name={this.state.event.name}
							description={this.state.event.description}
							eventDate={this.state.event.eventDate}
							startDate={this.state.event.startDate}
							endDate={this.state.event.endDate}
							dates={this.state.event.dates}
							show={this.state.isModalOpen}
							onHide={this.handleHideModal}
							handleSubmit={this.handleSubmitEdit}
						/>
					) : null
				}

				<main className="container-fluid py-5">
					<div className="row">
						<div className="col-md-4 col-xs-12">
							<SideMenu
								handleSubmitCreate={this.handleSubmitCreate}
							/>
						</div>

						{/* EVENT LIST */}
						<div className="col-md-8 col-xs-12">
							<Calendar
								events={this.state.events}
								handleClickEvent={this.handleClickEvent}
							/>
						</div>
					</div>
					<ToastContainer newestOnTop/>
				</main>
			</>
		);
	}
}



export default Home;
