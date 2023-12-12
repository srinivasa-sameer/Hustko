import React, { useState } from 'react';
// import '../../App.css';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const onLoginClick = () => {
    // You'll update this function later...
  };

  const onRegisterClick = () => {
    navigate('/Registerpage'); // Replace '/registration' with the path to your registration page
  };

  return (
    <div className="signinBackground">
      <div className={'mainContainer'}>
        <div className="loginBox">
          <div className={'titleContainer'}>
            <div>Login</div>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className={'buttonContainer'}>
            <Link
              onClick={onLoginClick}
              className="btn btn-primary loginButton"
            >
              Log In{' '}
            </Link>
            <Link onClick={onRegisterClick} className="btn btn-success">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
