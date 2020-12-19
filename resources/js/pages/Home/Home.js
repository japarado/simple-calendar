import React, {Component} from "react";

import Navbar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import Calendar from "../../components/Calendar/Calendar";

import {store, index} from "../../services/eventService";
import EditModal from "../../components/EditModal/EditModal";

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

	async refreshEvents()
	{
		const res = await this.fetchEvents();
		const processedEvents = this.processEvents(res.data.events);
		this.setState({events: processedEvents});
	}

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

	handleSubmitCreate = async (event, e) => 
	{
		e.preventDefault();
		await store(event);
		await this.refreshEvents();
	}

	handleSubmitEdit = async (event, e) => 
	{
		e.preventDefault();
	}

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
		// this.setState({isModalOpen: true});
		// console.log(arg.event.extendedProps.id);
		// console.log(arg.event.extendedProps.description);
		// console.log(arg.event.start)
		// console.log(arg.event.end)
	}

	handleHideModal = () => this.setState({isModalOpen: false});

	handleShowModal = () => this.setState({isModalOpen: true});

	render() 
	{
		return (
			<>
				<Navbar/>

				{this.state.isModalOpen ? 
					(
						<EditModal 
							name={this.state.event.name}
							description={this.state.event.description}
							eventDate={this.state.event.eventDate}
							startDate={this.state.event.startDate}
							endDate={this.state.event.endDate}
							dates={this.state.event.dates}
							show={this.state.isModalOpen}
							onHide={this.handleHideModal}
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
				</main>
			</>
		);
	}
}



export default Home;
