import React, {Component} from "react";

import Navbar from "../../components/Navbar/Navbar";
import CalendarForm from "../../components/CalendarForm/CalendarForm";
import Calendar from "../../components/Calendar/Calendar";

import {store} from "../../services/eventService";

class Home extends Component
{
	handleSubmitCreate = async (event, e) => 
	{
		e.preventDefault();
		const response = await store(event);
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
							<Calendar/>
						</div>
					</div>
				</main>
			</>
		);
	}
}



export default Home;
