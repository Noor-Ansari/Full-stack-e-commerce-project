import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

const initialValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const validationSchema = Yup.object({
	name: Yup.string()
		.trim()
		.min(5, "Too short")
		.max(30, "Too long")
		.required("Name is required"),
	email: Yup.string().email("Email is not valid").required("Email is required"),
	password: Yup.string()
		.trim()
		.min(5, "Too short")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.trim()
		.oneOf([Yup.ref("password"), null], "Password does not match")
		.required("Confirm Password is required"),
});

function RegisterForm() {
	const history = useHistory();
	const [modal, setModal] = useState(false);
	const [modalText, setModaltext] = useState("");

	const onSubmit = (values) => {
		axios
			.post("http://localhost:4000/api/register/", {
				name: values.name,
				email: values.email,
				password: values.password,
				confirmPassword: values.confirmPassword,
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
									<label htmlFor='name' className='form-label'>
										Name
									</label>
									<span className='text-message'>
										<ErrorMessage name='name' />
									</span>
								</div>
								<Field
									name='name'
									type='text'
									placeholder='Name...'
									className='form-control'
								/>
							</div>
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
									placeholder='Email...'
									className='form-control'
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
									placeholder='Password...'
									autoComplete='on'
									className='form-control'
								/>
							</div>
							<div className='form-group'>
								<div className='labels-row'>
									<label htmlFor='confirmPassword' className='form-label'>
										Confirm Password
									</label>
									<span className='text-message'>
										<ErrorMessage name='confirmPassword' />
									</span>
								</div>

								<Field
									name='confirmPassword'
									type='password'
									placeholder='Confirm Password...'
									className='form-control'
									autoComplete='on'
								/>
							</div>
							<button type='submit' className='submit-button'>
								Register
							</button>
						</Form>
					</Formik>
					<p className='or'>or</p>
					<GoogleAuth
						text='Register with google'
						action='register'
						setModal={setModal}
						setModaltext={setModaltext}
					/>
					<p className='info-message'>
						Already have an account? <Link to='/login'>Login</Link>
					</p>
				</div>
			</main>
		</>
	);
}

export default RegisterForm;
