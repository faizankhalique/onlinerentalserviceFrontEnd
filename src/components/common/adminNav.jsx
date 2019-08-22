import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/authService";
class AdminNav extends Component {
  state = {};
  render() {
    const user = authService.getCurrentUser();
    return (
      <React.Fragment>
        <nav
          className="navbar  sticky-top navbar-expand-lg navbar-light "
          style={{ backgroundColor: "#2c3e50" }}
        >
          <NavLink className="navbar-brand" to="#" style={{ color: "white" }}>
            Admin
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
                <NavLink className="nav-link" to="/" style={{ color: "white" }}>
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/userProfile"
                  tabIndex="-1"
                  aria-disabled="true"
                  style={{ color: "white" }}
                >
                  {user.fullName}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/logOut"
                  style={{ color: "white" }}
                >
                  log-out
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default AdminNav;
