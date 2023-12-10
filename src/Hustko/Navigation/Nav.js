import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSolidDog } from "react-icons/bi";
import "./Nav.css";
import * as userclient from "../Profile/UserClient";
function Nav() {
  const { pathname } = useLocation();
  const [account, setAccount] = useState(null);
  const fetchAccount = async () => {
    const account = await userclient.account();
    setAccount(account);
  };
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link to="/Hustko" class="nav-link active fs-4">
                <BiSolidDog
                  style={{ fontSize: "1.2em" }}
                  className="mx-2 mb-1"
                />
                Hustko
              </Link>
            </li>
          </ul>
        </div>
        <div class="mx-auto order-0">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              size="300"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        {/* {account && (
        )} */}

        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ms-auto mx-2 mb-2 mb-lg-0">
            <li class="nav-item hustko-dropdown mt-1">
              <button
                class="nav-link active dropdown btn btn-outline-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="me-2">{account.firstName}</span>
                Settings
              </button>
              <ul class="dropdown-menu ">
                <li>
                  <Link class="dropdown-item" to="/Hustko/Addresses">
                    All Addresses
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="/Hustko/LikedItems">
                    Liked Items
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="/Login">
                    Sign Out
                  </Link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <Link to="/Hustko/Profile" class="nav-link active fs-5">
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
