import "./Navbar.css";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React from "react";
import { connect } from "react-redux";
import { removeUser } from "../../redux/actionCreators";
import LabeledIcon from "../LabeledIcon";

function Navbar({ user, removeUser }) {
	const logOut = () => {
		let result = window.confirm("Do you want to logout?");
		if (result) {
			removeUser(user);
		}
	};

	const secondRowMeta = [
		{ link: "/", label: "Home" },
		{ link: "/allproducts/fashion", label: "Fashion" },
		{ link: "/allproducts/sports", label: "Sports" },
		{ link: "/allproducts/technology", label: "Technology" },
		{ link: "/allproducts/footwears", label: "Footwears" },
	];

	const userLabel = user ? (
		<p onClick={logOut} className='nav-links nav-icon'>
			<VpnKeyIcon />
			Logout
		</p>
	) : (
		<LabeledIcon text='Login' Icon={VpnKeyIcon} href='/login' />
	);
	return (
		<nav>
			<div className='first-row'>
				<div className='left-part'>
					<LabeledIcon text='Search' Icon={SearchOutlinedIcon} />
					<LabeledIcon text='Location' Icon={RoomOutlinedIcon} />
				</div>
				<h1 className='brand-name'>
					<LabeledIcon text='Shopping Plaza' href='/' />
				</h1>
				<div className='right-part'>
					{userLabel}
					<LabeledIcon
						text='Your cart'
						Icon={LocalMallOutlinedIcon}
						href='/user/cart'
					/>
				</div>
			</div>
			<div className='second-row'>
				{secondRowMeta.map((item, idx) => (
					<LabeledIcon text={item.label} href={item.link} key={idx} />
				))}
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
