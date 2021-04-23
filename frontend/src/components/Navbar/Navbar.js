import "./Navbar.css";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Navbar({ user }) {
	const userLabel = user?.name ? user.name : "Login / Register"

	const secondRow = [{link : "/", label : "Home"},{link : "/allproducts/fashion", label : "Fashion"}, {link : "/allproducts/sports", label : "Sports"}, {link : "/allproducts/technology", label : "Technology"}, {link : "/allproducts/footwear", label : "Footwears"} ]

	return (
		<nav>
			<div className='first-row'>
				<div className='left-part'>
					<Link to="#" className='nav-icon'>
						<SearchOutlinedIcon />
						Search
					</Link>
					<Link to="#" className='nav-icon'>
						<RoomOutlinedIcon />
						Location
					</Link>
				</div>
				<h1 className='brand-logo'>
					<Link to='/' className='brand-link'>
						Shopping Plaza
					</Link>
				</h1>
				<div className='right-part'>
					<Link to="/signin" className='nav-icon'>
						<AccountCircleOutlinedIcon />
						{userLabel}
					</Link>
					<Link to="/user/cart" className='nav-icon'>
						<LocalMallOutlinedIcon />
						Your cart
					</Link>
				</div>
			</div>
			<div className='second-row'>
				<ul>
					{secondRow.map(item => (
						<li>
						<Link to={item.link} className='nav-links'>
							{item.label}
						</Link>
					</li>
					))}
				</ul>
			</div>
		</nav>
	);
}

const mapStateToProps = (state) => {
	return {
		user : state.user
	}
}

export default connect(mapStateToProps)(Navbar)
