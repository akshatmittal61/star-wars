import React, { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
function Theme() {
	const {theme, setTheme} = useContext(GlobalContext);
	const body = document.querySelector("body");
	function changeTheme() {
		setTheme(theme ? false : true);
	}
	body.setAttribute("class", theme ? "light" : "dark");
	return (
		<button
			title={`${theme ? "Light" : "Dark"} Mode`}
			className="theme icon"
			onClick={changeTheme}
		>
			<span
				className="theme-icon material-icons"
				id={theme ? "light" : "dark"}
			>
				{`${theme ? "light" : "dark"}_mode`}
			</span>
		</button>
	);
}
export default Theme;
