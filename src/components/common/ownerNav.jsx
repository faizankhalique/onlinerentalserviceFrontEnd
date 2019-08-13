import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/authService";
class OwnerNav extends Component {
  state = {};
  render() {
    const user = authService.getCurrentUser();
    return (
      <React.Fragment>
        <nav
          className="navbar sticky-top navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#39CCCC" }}
        >
          <NavLink className="navbar-brand" to="#">
            Product Owner
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/userProfile"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  {user.fullName}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logOut">
                  Log-out
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to="#">
                    Action
                  </NavLink>
                  <NavLink className="dropdown-item" to="#">
                    Another action
                  </NavLink>
                  <div className="dropdown-divider" />
                  <NavLink className="dropdown-item" to="#">
                    Something else here
                  </NavLink>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default OwnerNav;
