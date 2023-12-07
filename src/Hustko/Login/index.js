import { Link } from "react-router-dom";
import * as client from "../Profile/UserClient.js";
import { useState } from "react";
function Login() {
  const [credentials, setCredentials] = useState({
    email: "tony@stark.com",
    password: "stark123",
  });
  const testSignIn = async () => {
    const response = await client.signin(credentials);
  };
  return (
    <div>
      <h1>Login Page</h1>
      <Link className="btn btn-primary" onClick={testSignIn} to="/Hustko">
        Login
      </Link>
    </div>
  );
}
export default Login;
