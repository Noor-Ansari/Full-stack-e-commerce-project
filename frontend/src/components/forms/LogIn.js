import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../../redux/actionCreators";
import "./Forms.css";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import GoogleAuth from "./GoogleAuth";

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
	const [modal, setModal] = useState(false);
	const [modalText, setModaltext] = useState("");

	const onSubmit = (values) => {
		axios
			.post("http://localhost:4000/api/login/", {
				email: values.email,
				password: values.password,
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

	return (
		<>
			{modal && <Modal modalText={modalText} setModal={setModal} />}
			<main className='form-main-wrapper'>
				<div className='form-wrapper'>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						<Form>
							<div className='form-group'>
								<div className='labels-row'>
									<label htmlFor='email' className='form-label'>
										Email
									</label>
									<span className='text-message'>
										<ErrorMessage name='email' />
									</span>
								</div>

								<Field
									name='email'
									type='email'
									className='form-control'
									placeholder='Email...'
								/>
							</div>
							<div className='form-group'>
								<div className='labels-row'>
									<label htmlFor='password' className='form-label'>
										Password
									</label>
									<span className='text-message'>
										<ErrorMessage name='password' />
									</span>
								</div>

								<Field
									name='password'
									type='password'
									className='form-control'
									placeholder='Password...'
									autoComplete='on'
								/>
							</div>
							<button type='submit' className='submit-button'>
								Login
							</button>
						</Form>
					</Formik>
					<p className='or'>or</p>
					<GoogleAuth
						text='Login with google'
						action='login'
						setModal={setModal}
						setModaltext={setModaltext}
					/>
					<p className='info-message'>
						Don't have an account? <Link to='/register'>Register</Link>
					</p>
				</div>
			</main>
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		addUserToState: (user) => dispatch(addUser(user)),
	};
};

export default connect(null, mapDispatchToProps)(LogInForm);
