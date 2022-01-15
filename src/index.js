import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App.jsx";
import { GlobalProvider } from "./Context/GlobalContext";

ReactDOM.render(
	<React.StrictMode>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
