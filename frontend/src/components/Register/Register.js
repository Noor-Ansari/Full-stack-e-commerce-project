import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

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

	const handleRegister = response => {
		axios.post("http://localhost:4000/api/google/register", {
				tokenId : response.tokenId
		})
		.then(({data}) => {
			if (data.info) {
			  alert(`${data.info}`)
			} else {
				history.push("/login")
			}
			
		})
		.catch((err) => console.log(err))
}

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
		<>
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
					<Field name='name' type='text' className='form-control' />
					<ErrorMessage name='name' className='text-message' />
				</div>
				<div className='form-group'>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<Field name='email' type='email' className='form-control' />
					<ErrorMessage name='email' className='text-message' />
				</div>
				<div className='form-group'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<Field name='password' type='password' className='form-control' />
					<ErrorMessage name='password' className='text-message' />
				</div>
				<div className='form-group'>
					<label htmlFor='confirmPassword' className='form-label'>
						Confirm Password
					</label>
					<Field
						name='confirmPassword'
						type='password'
						className='form-control'
					/>
					<ErrorMessage name='confirmPassword' className='text-message' />
				</div>
				<button type='submit' className='submit-button'>
					Register
				</button>
			</Form>
			</Formik>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="register-button">Register with google</button>
                  )}
				onSuccess={handleRegister}
				onFailure={handleRegister}
				cookiePolicy={"single_host_origin"}
			/>
			</>
	);
}

export default RegisterForm;
