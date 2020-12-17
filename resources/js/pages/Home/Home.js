import React, {Component} from "react";

import Navbar from "../../components/Navbar/Navbar";
import CalendarForm from "../../components/CalendarForm/CalendarForm";
import {createDayArray} from "../../utils";

class Home extends Component
{
	render() 
	{
		return (
			<>
				<Navbar/>

				<main className="container-fluid pt-5">
					<div className="row">
						<div className="col-md-4 col-xs-12">
							<CalendarForm/>
						</div>

						{/* EVENT LIST */}
						<div className="col-md-8 col-xs-12">
						Event list
						</div>
					</div>
				</main>
			</>
		);
	}
}



export default Home;
