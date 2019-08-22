import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class RenterLeftNav extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <ul className="sidebar-nav">
          <li>
            <Link to="/userProfile">
              <i className="fa fa-user" aria-hidden="true">
                {" "}
                Pofile
              </i>
            </Link>
          </li>
          <li>
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-bell" aria-hidden="true">
                {" "}
                Requests Status
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink
                className="dropdown-item"
                to="/renterVehiclesRequestsHistory"
              >
                Vehicles
              </NavLink>
              <NavLink
                className="dropdown-item"
                to="/renterHousesRequestsHistory"
              >
                Houses
              </NavLink>
              <NavLink
                className="dropdown-item"
                to="/renterShopsRequestsHistory"
              >
                Shops
              </NavLink>
              <NavLink
                className="dropdown-item"
                to="/renterToolsRequestsHistory"
              >
                Tools
              </NavLink>
            </div>
          </li>
          <li>
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
                Bookings status
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="/renterVehicleBookings">
                Vehicles
              </NavLink>
              <NavLink className="dropdown-item" to="/renterHouseBookings">
                Houses
              </NavLink>
              <NavLink className="dropdown-item" to="/renterShopBookings">
                Shops
              </NavLink>
              <NavLink className="dropdown-item" to="/renterToolBookings">
                Tools
              </NavLink>
            </div>
          </li>
          {/* <li>
            <Link to="#">
              <i className="fa fa-bus" aria-hidden="true">
                {" "}
                Vehicle Rent Request
              </i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-home" aria-hidden="true">
                Property Rent Request
              </i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-wrench" aria-hidden="true">
                {" "}
                Tool Rent Request
              </i>
            </Link>
          </li> */}
        </ul>
      </React.Fragment>
    );
  }
}

export default RenterLeftNav;
