import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiSolidDog } from 'react-icons/bi';
import './Nav.css';
import * as userclient from '../Profile/UserClient';
import { useSelector, useDispatch } from 'react-redux';
import { setUserSessionFetched } from '../Login/HustkoLogin/SignIn/userSessionReducer';
function Nav() {
  const { pathname } = useLocation();
  const [searchText, setSearchText] = useState('');

  const [account, setAccount] = useState(null);
  //const [accountFetched, setAccountFetched] = useState(null);
  const accountFetched = useSelector(
    (state) => state.userSessionReducer.accountFetched
  );
  const dispatch = useDispatch();
  const fetchAccount = async () => {
    const account = await userclient.account();
    setAccount(account);
    if (account !== '') {
      dispatch(setUserSessionFetched(true));
    }
  };
  const navigate = useNavigate();
  const onSignOut = async () => {
    await userclient.signout();
    dispatch(setUserSessionFetched(false));
    navigate('/Hustko/Login');
  };

  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark floating-nav">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/Hustko" className="nav-link active fs-4">
                <BiSolidDog
                  style={{ fontSize: '1.2em' }}
                  className="mx-2 mb-1"
                />
                Hustko
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto order-0">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              size="300"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Link to={`/Hustko/Search/${searchText}`}>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </Link>
          </form>
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ms-auto mx-2 mb-2 mb-lg-0">
            {accountFetched && (
              <li className="nav-item hustko-dropdown mt-1">
                <button
                  className="nav-link active dropdown btn btn-outline-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Settings
                </button>
                <ul className="dropdown-menu ">
                  <li>
                    <Link className="dropdown-item" to="/Hustko/Addresses">
                      All Addresses
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" onClick={onSignOut}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {accountFetched && (
              <li className="nav-item">
                <Link to="/Hustko/Profile" className="nav-link active fs-5">
                  Profile
                </Link>
              </li>
            )}
            {!accountFetched && (
              <li className="nav-item">
                <Link to="/Hustko/login" className="nav-link active fs-5">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Nav;
