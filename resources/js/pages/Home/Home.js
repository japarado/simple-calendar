import React, {Component} from "react";

import Navbar from "../../components/Navbar/Navbar";
import CalendarForm from "../../components/CalendarForm/CalendarForm";

class Home extends Component
{
	handleSubmitCreate = (event, e) => 
	{
		e.preventDefault();
	}

	render() 
	{
		return (
			<>
				<Navbar/>

				<main className="container-fluid pt-5">
					<div className="row">
						<div className="col-md-4 col-xs-12">
							<CalendarForm
								handleSubmitCreate={this.handleSubmitCreate}
							/>
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
