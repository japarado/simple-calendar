import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => 
{
	return (
		<>
			<Navbar/>

			<main className="container-fluid pt-5">
				<div className="row">
					<div className="col-md-4 col-xs-12">

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
							<div className="form-group col-md-6">
							</div>
						</div>

					</div>
					<div className="col-md-8 col-xs-12">
						Event list
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
