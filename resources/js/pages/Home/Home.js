import React, {useState} from "react";

import Navbar from "../../components/Navbar/Navbar";
import CalendarForm from "../../components/CalendarForm/CalendarForm";

const Home = () => 
{
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	return (
		<>
			<Navbar/>

			<main className="container-fluid pt-5">
				<div className="row">
					<div className="col-md-4 col-xs-12">
						<CalendarForm
							startDate={startDate}
							setStartDate={setStartDate}
							endDate={endDate}
							setEndDate={setEndDate}
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
};

export default Home;
