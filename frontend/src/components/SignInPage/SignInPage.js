import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios"
import { useHistory, Link } from 'react-router-dom';
import "./SignInPage.css"

function SignInPage({setUser}) {
   const history = useHistory()
    const handleRegister = response => {
            axios.post("http://localhost:4000/api/google/register", {
                    tokenId : response.tokenId
            })
            .then(({data}) => {
              console.log(data)
                sessionStorage.setItem('user', JSON.stringify(data));
                setUser(data)
              history.push("/")
            })
            .catch((err) => console.log(err))
    }

    const handleLogin = response => {
    
        axios.post("http://localhost:4000/api/google/login", {
                tokenId : response.tokenId
        })
        .then(({data}) => {
            sessionStorage.setItem('user', JSON.stringify(data));
            setUser(data)
            history.push("/")
        })
        .catch((err) => console.log(err))
}

	return (
		<div className='signin-wrapper'>
           
              <Link to="/" className="signin-text">Shopping Plaza</Link>
              <p className="signin-description">Buy your favourite products by login/register</p>
            <GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login-button">Login with google</button>
                  )}
				onSuccess={handleLogin}
				onFailure={handleLogin}
				cookiePolicy={"single_host_origin"}
			/>
            <GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="register-button">Register with google</button>
                  )}
				onSuccess={handleRegister}
				onFailure={handleRegister}
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
}

export default SignInPage;
