import React from "react";

const Navbar = () => 
{
	return(
		<nav className="navbar navbar-expand-md navbar-dark bg-dark">
			<div className="container-fluid">
				<a
					className="navbar-brand"
					href="#">{ process.env.MIX_APP_NAME }</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarsExampleDefault"
					aria-controls="navbarsExampleDefault"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className="collapse navbar-collapse"
					id="navbarsExampleDefault">
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
