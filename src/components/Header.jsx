import React, { useState } from "react";
import favicon from "../images/favicon.svg";
import Theme from "./theme";

const Header = () => {
	const [rotate, setRotate] = useState(true);
	setTimeout(() => {
		setRotate(!rotate);
	}, 2000);
	return (
		<header className="header">
			<div className="header-left">
				<div className="header-left-burger">
					<button className="icon">
						<span className="material-icons">menu</span>
					</button>
				</div>
				<div className="header-left-logo">
					<div className="header-left-logo-image">
						<img
							src={favicon}
							alt="Star Wars"
							className="header-left-logo-image__img"
							style={{
								transform: `rotateY(${rotate ? 0 : 180}deg)`,
							}}
						/>
					</div>
				</div>
			</div>
			<div className="header-right">
				<Theme />
			</div>
		</header>
	);
};

export default Header;
