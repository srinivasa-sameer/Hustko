import { Link } from "react-router-dom";
function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link className="btn btn-primary" to="/Hustko">
        Login
      </Link>
    </div>
  );
}
export default Login;
