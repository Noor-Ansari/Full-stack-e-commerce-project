import "./Navbar.css";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeUser } from "../../redux/actionCreators";

function Navbar({ user, removeUser }) {
	const logOut = () => {
		let result = window.confirm("Do you want to logout?");
		console.log(result);
		if (result) {
			removeUser(user);
		}
	};

	const secondRow = [
		{ link: "/", label: "Home" },
		{ link: "/allproducts/fashion", label: "Fashion" },
		{ link: "/allproducts/sports", label: "Sports" },
		{ link: "/allproducts/technology", label: "Technology" },
		{ link: "/allproducts/footwears", label: "Footwears" },
	];

	return (
		<nav>
			<div className='first-row'>
				<div className='left-part'>
					<Link to='#' className='nav-icon'>
						<SearchOutlinedIcon />
						Search
					</Link>
					<Link to='#' className='nav-icon'>
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
					{user ? (
						<div className='nav-icon' onClick={logOut}>
							<VpnKeyIcon />
							Logout
						</div>
					) : (
						<Link to='/login' className='nav-icon'>
							<VpnKeyIcon />
							Login
						</Link>
					)}
					{user ? (
						<div className='nav-icon'>
							<AccountCircleOutlinedIcon />
							{user.name}
						</div>
					) : (
						<Link to='/register' className='nav-icon'>
							<AccountCircleOutlinedIcon />
							Register
						</Link>
					)}
					<Link to='/user/cart' className='nav-icon'>
						<LocalMallOutlinedIcon />
						Your cart
					</Link>
				</div>
			</div>
			<div className='second-row'>
				<ul>
					{secondRow.map((item, idx) => (
						<li key={idx}>
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
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeUser: (user) => dispatch(removeUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
