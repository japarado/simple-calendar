import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => 
{
	return (
		<>
			<Navbar/>

			<main className="container-fluid">
				<div className="row">
					<div className="col-md-4 col-xs-12">
						Form
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
