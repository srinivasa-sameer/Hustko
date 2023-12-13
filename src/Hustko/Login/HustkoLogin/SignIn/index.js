import React, { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import * as userClient from '../../../Profile/UserClient';

const SignIn = (props) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const onLoginClick = async () => {
    const response = await userClient.signin(credentials);
    navigate('/Hustko/home');
  };

  return (
    <div className="signinBackground">
      <div className="mainContainer">
        <div className="loginBox">
          <div className="titleContainer">
            <div>Login</div>
          </div>
          <br />
          <div className="inputContainer">
            <input
              value={credentials.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="inputBox"
            />
          </div>
          <br />
          <div className="inputContainer">
            <input
              value={credentials.password}
              type="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="inputBox"
            />
          </div>
          <br />
          <div className="buttonContainer">
            <button
              className="btn btn-primary loginButton"
              onClick={onLoginClick}
            >
              Log In
            </button>
            <Link to="/Hustko/register">
              <button className="btn btn-success">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
