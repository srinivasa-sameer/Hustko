import { Link, useLocation } from "react-router-dom";
import { BiSolidDog } from "react-icons/bi";
function Nav() {
  const { pathname } = useLocation();
  return (
    <div>
      {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="#">
              <BiSolidDog style={{ fontSize: "1.2em" }} className="me-2 mb-1" />
              Hustko
            </a>
            <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li>
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    size="40"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link to="/" class="nav-link active fs-4">
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
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ms-auto mx-2 mb-2 mb-lg-0">
            <li class="nav-item mt-1">
              {/* <Link
                to="/Hustko/Profile"
                class="nav-link active fs-5 dropdown-toggle"
              >
                Profile1
              </Link> */}

              <button
                class="nav-link active dropdown btn btn-outline-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </button>
              <ul class="dropdown-menu">
                <li>
                  <Link class="dropdown-item" href="#">
                    All Addresses
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" href="#">
                    Liked Items
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" href="#">
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
