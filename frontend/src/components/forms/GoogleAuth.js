import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUser } from "../../redux/actionCreators";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

function GoogleAuth({ action, text, addUserToState, setModal, setModaltext }) {
	const history = useHistory();

	const handleLogin = (response) => {
		axios
			.post("http://localhost:4000/api/google/login", {
				tokenId: response.tokenId,
			})
			.then(({ data }) => {
				if (data.info) {
					setModaltext(`${data.info}`);
					setModal(true);
				} else {
					sessionStorage.setItem("user", JSON.stringify(data));
					addUserToState(data);
					history.push("/");
				}
			})
			.catch((err) => console.log(err));
	};
	const handleRegister = (response) => {
		axios
			.post("http://localhost:4000/api/google/register", {
				tokenId: response.tokenId,
			})
			.then(({ data }) => {
				if (data.info) {
					setModaltext(`${data.info}`);
					setModal(true);
				} else {
					history.push("/login");
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			render={(renderProps) => (
				<button
					onClick={renderProps.onClick}
					disabled={renderProps.disabled}
					className='google-button'
				>
					{text}
				</button>
			)}
			onSuccess={action === "register" ? handleRegister : handleLogin}
			onFailure={action === "register" ? handleRegister : handleLogin}
			cookiePolicy={"single_host_origin"}
		/>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		addUserToState: (user) => dispatch(addUser(user)),
	};
};

export default connect(null, mapDispatchToProps)(GoogleAuth);
