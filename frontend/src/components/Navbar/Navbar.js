import "./Navbar.css"
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div className="first-row">
                <div className="left-part">
                <span className="nav-icon">
                <SearchOutlinedIcon/>
                Search
                        </span>
                        <span className="nav-icon">
                        <RoomOutlinedIcon/>
                        Location
                        </span>
                </div>
                <h1 className="brand-logo"><Link to="/" className="brand-link"> Shopping Plaza </Link></h1>
                <div className="right-part">
                    <span className="nav-icon">
                    <AccountCircleOutlinedIcon/>
                    Login / Register
                    </span>
                    <span className="nav-icon">
                    <LocalMallOutlinedIcon/>
                    Your cart
                        </span>
                </div>
            </div>
            <div className="second-row">
                <ul>
                    <li><Link to="/" className="nav-links">Home</Link></li>
                    <li><Link to="/allproducts/fashion" className="nav-links">Fashion</Link></li>
                    <li><Link to="/allproducts/sports" className="nav-links">Sports</Link></li>
                    <li><Link to="/allproducts/technology" className="nav-links">Technology</Link></li>
                    <li><Link to="/allproducts/footwear" className="nav-links">Footwear</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;

