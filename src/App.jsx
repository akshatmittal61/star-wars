import React from "react";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
	AOS.init();
	return (
		<div>
			<Home />
		</div>
	);
};

export default App;
