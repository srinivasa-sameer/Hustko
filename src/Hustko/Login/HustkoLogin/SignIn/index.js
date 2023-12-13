import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import * as userClient from "../../../Profile/UserClient";
import { useSelector, useDispatch } from "react-redux";
import { setUserSessionFetched } from "./userSessionReducer";

const SignIn = (props) => {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onLoginClick = async () => {
    try {
      const response = await userClient.signin(credentials);
      dispatch(setUserSessionFetched(true));
      if (response.role === "USER") {
        navigate("/Hustko/home");
      } else if (response.role === "SUPPLIER") {
        navigate("/Hustko/Supplier");
      } else {
        navigate("/Hustko/Admin");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    dispatch(setUserSessionFetched(false));
  });

  return (
    <div className="signinBackground mostly-customized-scrollbar">
      <div className="mainContainer">
        <div className="loginBox">
          <div className="titleContainer">
            <div>Login</div>
          </div>
          <br />
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
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
