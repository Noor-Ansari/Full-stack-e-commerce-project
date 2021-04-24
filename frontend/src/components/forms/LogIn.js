import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../../redux/actionCreators";
import { GoogleLogin } from "react-google-login";
import "./Forms.css";
import {Link} from "react-router-dom"

const initialValues = {
	email: "",
	password: "",
};

const validationSchema = Yup.object({
	email: Yup.string().email("Email is not valid").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

function LogInForm({ addUserToState }) {
	const history = useHistory();

	const handleLogin = (response) => {
		axios
			.post("http://localhost:4000/api/google/login", {
				tokenId: response.tokenId,
			})
			.then(({ data }) => {
				if (data.info) {
					alert(`${data.info}`);
				} else {
					sessionStorage.setItem("user", JSON.stringify(data));
					addUserToState(data);
					history.push("/");
				}
			})
			.catch((err) => console.log(err));
	};

	const onSubmit = (values) => {
		axios
			.post("http://localhost:4000/api/login/", {
				email: values.email,
				password: values.password,
			})
			.then(({ data }) => {
				if (data.info) {
					alert(`${data.info}`);
				} else {
					sessionStorage.setItem("user", JSON.stringify(data));
					addUserToState(data);
					history.push("/");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<main className='form-main-wrapper'>
			<div className='form-wrapper'>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					<Form>
						<div className='form-group'>
							<label htmlFor='email' className='form-label'>
								Email
							</label>
							<Field
								name='email'
								type='email'
								className='form-control'
								placeholder='Email...'
							/>
							<p className='text-message'>
								<ErrorMessage name='email' />
							</p>
						</div>
						<div className='form-group'>
							<label htmlFor='password' className='form-label'>
								Password
							</label>
							<Field
								name='password'
								type='password'
								className='form-control'
								placeholder='Password...'
								autoComplete="on"
							/>
							<p className='text-message'>
								<ErrorMessage name='password' />
							</p>
						</div>
						<button type='submit' className='submit-button'>
							Login
						</button>
					</Form>
				</Formik>
				<p className='or'>or</p>
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					render={(renderProps) => (
						<button
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							className='google-button'
						>
							Login with google
						</button>
					)}
					onSuccess={handleLogin}
					onFailure={handleLogin}
					cookiePolicy={"single_host_origin"}
				/>
				<p className='info-message'>Don't have an account? <Link to="/register">Register</Link></p>
			</div>
		</main>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		addUserToState: (user) => dispatch(addUser(user)),
	};
};

export default connect(null, mapDispatchToProps)(LogInForm);
