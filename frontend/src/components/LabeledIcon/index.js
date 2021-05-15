import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
function LabeledIcon({ Icon, text, href = "#" }) {
	return (
		<Link to={href} className='nav-links nav-icon'>
			{Icon && <Icon />}
			<p>{text}</p>
		</Link>
	);
}

export default LabeledIcon;
