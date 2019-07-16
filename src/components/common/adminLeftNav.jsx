import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class AdminLeftNav extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <ul>
          <li>
            <NavLink to="/userProfile">
              <i className="fa fa-user" aria-hidden="true">
                {" "}
                Pofile
              </i>
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
              <i className="fa fa-envelope" aria-hidden="true">
                {" "}
                Requests
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="/vehicleRequests">
                Vehicles
              </NavLink>
              <NavLink className="dropdown-item" to="#">
                Houses
              </NavLink>
              <NavLink className="dropdown-item" to="#">
                Tools
              </NavLink>
            </div>
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
              <i className="fa fa-arrow-circle-right" aria-hidden="true">
                {" "}
                Owners
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="/owners">
                All
              </NavLink>
              <NavLink className="dropdown-item" to="#">
                Vehicles
              </NavLink>
              <NavLink className="dropdown-item" to="#">
                Houses
              </NavLink>
              <div className="dropdown-divider" />
              <NavLink className="dropdown-item" to="#">
                Tools
              </NavLink>
            </div>
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
              <i className="fa fa-bus" aria-hidden="true">
                {" "}
                Renters
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
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
              <i className="fa fa-home" aria-hidden="true">
                {" "}
                Properties
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
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
              <i className="fa fa-wrench" aria-hidden="true">
                {" "}
                Tools
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
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
          <li>
            <NavLink to="#">
              <i className="fa fa-bus" aria-hidden="true">
                {" "}
                Vehicles
              </i>
            </NavLink>
          </li>
          <li>
            <NavLink to="#">
              <i className="fa fa-trash-o" aria-hidden="true">
                {" "}
                Delete Product
              </i>
            </NavLink>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default AdminLeftNav;
