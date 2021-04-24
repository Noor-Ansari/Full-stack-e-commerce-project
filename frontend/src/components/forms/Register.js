import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";

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

	const handleRegister = (response) => {
		axios
			.post("http://localhost:4000/api/google/register", {
				tokenId: response.tokenId,
			})
			.then(({ data }) => {
				if (data.info) {
					alert(`${data.info}`);
				} else {
					history.push("/login");
				}
			})
			.catch((err) => console.log(err));
	};

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
					alert(`${data.info}`);
				} else {
					history.push("/login");
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
							<label htmlFor='name' className='form-label'>
								Name
							</label>
							<Field name='name' type='text' placeholder="Name..." className='form-control' />
							<p className='text-message'>
								<ErrorMessage name='name' />
							</p>
						</div>
						<div className='form-group'>
							<label htmlFor='email' className='form-label'>
								Email
							</label>
							<Field name='email' type='email' placeholder="Email..." className='form-control' />
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
								placeholder="Password..." 
								autoComplete='on'
								className='form-control'
							/>
							<p className='text-message'>
								<ErrorMessage name='password' />
							</p>
						</div>
						<div className='form-group'>
							<label htmlFor='confirmPassword' className='form-label'>
								Confirm Password
							</label>
							<Field
								name='confirmPassword'
								type='password'
								placeholder="Confirm Password..." 
								className='form-control'
								autoComplete='on'
							/>
							<p className='text-message'>
								<ErrorMessage name='confirmPassword' />
							</p>
						</div>
						<button type='submit' className='submit-button'>
							Register
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
							Register with google
						</button>
					)}
					onSuccess={handleRegister}
					onFailure={handleRegister}
					cookiePolicy={"single_host_origin"}
				/>
				<p className='info-message'>
					Already have an account? <Link to='/login'>Login</Link>
				</p>
			</div>
		</main>
	);
}

export default RegisterForm;
