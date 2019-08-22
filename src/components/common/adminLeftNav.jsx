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
                ProductRequests
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
              <NavLink className="dropdown-item" to="/houseRequests">
                Houses
              </NavLink>
              <NavLink className="dropdown-item" to="/shopRequests">
                shops
              </NavLink>
              <NavLink className="dropdown-item" to="/toolRequests">
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
              <i className="fa fa-envelope" aria-hidden="true">
                {" "}
                RentRequests
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="/vehicleRentRequests">
                Vehicles
              </NavLink>
              <NavLink className="dropdown-item" to="/houseRentRequests">
                Houses
              </NavLink>
              <NavLink className="dropdown-item" to="/shopRentRequests">
                Shops
              </NavLink>
              <NavLink className="dropdown-item" to="/toolRentRequests">
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
                All Owners
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
                Renters
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="/renters">
                All Renters
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
                Renters Bookings
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="/vehiclesBookings">
                Vehicles Booking
              </NavLink>
              <NavLink className="dropdown-item" to="/housesBookings">
                Houses Booking
              </NavLink>
              <NavLink className="dropdown-item" to="/shopsBookings">
                Shops Booking
              </NavLink>
              <NavLink className="dropdown-item" to="/toolsBookings">
                Tools Booking
              </NavLink>
            </div>
          </li>
          <li>
            <NavLink to="/reports">
              <i className="fa fa-table" aria-hidden="true">
                {" "}
                Statistics
              </i>
            </NavLink>
          </li>
          {/* <li className="nav-item dropdown">
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
                Renters Payments
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="#">
                Vehicles Payments
              </NavLink>
              <NavLink className="dropdown-item" to="#">
                Houses Payments
              </NavLink>
              <NavLink className="dropdown-item" to="#">
                Shops Payments
              </NavLink>
              <NavLink className="dropdown-item" to="#">
                Tools Payments
              </NavLink>
            </div>
          </li> */}
          {/* <li>
            <NavLink to="#">
              <i className="fa fa-bus" aria-hidden="true">
                {" "}
                Vehicles
              </i>
            </NavLink>
          </li> */}
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
