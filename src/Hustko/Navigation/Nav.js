import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidDog } from 'react-icons/bi';
import './Nav.css';
import * as userclient from '../Profile/UserClient';
function Nav() {
  const { pathname } = useLocation();
  const [searchText, setSearchText] = useState('');

  const [account, setAccount] = useState(null);
  const fetchAccount = async () => {
    const account = await userclient.account();
    setAccount(account);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
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
        {/* {account && (
        )} */}

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ms-auto mx-2 mb-2 mb-lg-0">
            <li className="nav-item hustko-dropdown mt-1">
              <button
                className="nav-link active dropdown btn btn-outline-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <span className="me-2">{account.firstName}</span> */}
                Settings
              </button>
              <ul className="dropdown-menu ">
                <li>
                  <Link className="dropdown-item" to="/Hustko/Addresses">
                    All Addresses
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Hustko/LikedItems">
                    Liked Items
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="/Hustko/login">
                    Sign Out
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/Hustko/Profile" className="nav-link active fs-5">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Nav;
