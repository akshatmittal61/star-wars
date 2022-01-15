import React, { useState } from "react";
import favicon from "../images/favicon.svg";

const Header = () => {
	const [rotate, setRotate] = useState(true);
	setTimeout(() => {
		setRotate(!rotate);
	}, 1000);
	return (
		<header className="header">
			<div className="header-left">
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
		</header>
	);
};

export default Header;
