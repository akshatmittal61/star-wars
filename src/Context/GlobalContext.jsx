import React, { useState, createContext } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [theme, setTheme] = useState(true);
	const axiosInstance = axios.create({
		baseURL: "https://swapi.py4e.com/api/",
	});
	return (
		<GlobalContext.Provider value={{ theme, setTheme, axiosInstance }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContext;
