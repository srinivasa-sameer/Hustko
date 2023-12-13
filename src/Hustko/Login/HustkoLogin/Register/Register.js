import { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router';
import * as userClient from '../../../Profile/UserClient';

function RegistrationForm() {
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
  });
  const navigate = useNavigate();
  const register = async () => {
    try {
      await userClient.signup(credentials);
      navigate('/Hustko/login');
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  return (
    <div className="registrationbackground">
      <div className="form-body">
        <div className={'titleContainer'}>
          <div>Register</div>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="email">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="username">
          <input
            className="form-control"
            type="text"
            id="firstName"
            placeholder="First Name"
            value={credentials.firstName}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className="lastname">
          <input
            type="text"
            name=""
            id="lastName"
            className="form-control"
            placeholder="Last Name"
            value={credentials.lastName}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div className="password">
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="mobile">
          <input
            className="form-control"
            type="text"
            id="mobile"
            placeholder="Mobile Number"
            value={credentials.mobile}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                mobile: e.target.value,
              })
            }
          />
        </div>
        <div className="role">
          <label className="d-flex justify-content-left mb-2">
            Select a Role
          </label>
          <div
            className="d-flex justify-content-left"
            onChange={(e) =>
              setCredentials({
                ...credentials,
                role: e.target.value,
              })
            }
          >
            <div class="form-check" style={{ marginRight: '1rem' }}>
              <input
                class="form-check-input"
                type="radio"
                name="role"
                value="USER"
              />
              <label class="form-check-label">USER</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="role"
                value="SUPPLIER"
              />
              <label class="form-check-label">SUPPLIER</label>
            </div>
          </div>
        </div>

        <div className="clearfix">
          <button type="submit" className="btn btn-warning" onClick={register}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
export default RegistrationForm;
