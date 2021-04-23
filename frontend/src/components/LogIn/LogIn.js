import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../../redux/actionCreators";
import { GoogleLogin } from "react-google-login";

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
    
    const handleLogin = response => {
    
        axios.post("http://localhost:4000/api/google/login", {
                tokenId : response.tokenId
        })
        .then(({data}) => {
            if (data.info) {
                alert(`${data.info}`)
            } else {
                sessionStorage.setItem('user', JSON.stringify(data));
            addUserToState(data)
            history.push("/")
            }
        })
        .catch((err) => console.log(err))
}

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
        <>
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
				<button type='submit' className='submit-button'>
					Login
				</button>
			</Form>
            </Formik>
            <GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login-button">Login with google</button>
                  )}
				onSuccess={handleLogin}
				onFailure={handleLogin}
				cookiePolicy={"single_host_origin"}
			/>
            </>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		addUserToState: (user) => dispatch(addUser(user)),
	};
};

export default connect(null, mapDispatchToProps)(LogInForm);
