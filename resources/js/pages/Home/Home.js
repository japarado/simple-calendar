import React, {Component} from "react";

import Navbar from "../../components/Navbar/Navbar";
import CalendarForm from "../../components/CalendarForm/CalendarForm";
import Calendar from "../../components/Calendar/Calendar";

import {store, index} from "../../services/eventService";

class Home extends Component
{
	state = {
		events: []
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
				processedEvents.push({title: event.name, date: date.date});
			});
		});
		return processedEvents;
	}

	handleSubmitCreate = async (event, e) => 
	{
		e.preventDefault();
		const response = await store(event);
		await this.refreshEvents();
	}


	render() 
	{
		return (
			<>
				<Navbar/>

				<main className="container-fluid py-5">
					<div className="row">
						<div className="col-md-4 col-xs-12">
							<CalendarForm
								handleSubmitCreate={this.handleSubmitCreate}
							/>
						</div>

						{/* EVENT LIST */}
						<div className="col-md-8 col-xs-12">
							<Calendar
								events={this.state.events}
							/>
						</div>
					</div>
				</main>
			</>
		);
	}
}



export default Home;
