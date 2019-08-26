import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
class ProductOwnerLeftNav extends Component {
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
              <i className="fa fa-envelope-o" aria-hidden="true">
                {" "}
                Add Requests
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="/vehicleRequestForm">
                <i className="fa fa-bus" aria-hidden="true">
                  {" "}
                  Vehicle Request
                </i>
              </NavLink>
              <NavLink className="dropdown-item" to="/houseRequestForm">
                <i className="fa fa-home" aria-hidden="true">
                  {" "}
                  Houses Request
                </i>
              </NavLink>
              <NavLink className="dropdown-item" to="/shopRequestForm">
                <i className="fa fa-home" aria-hidden="true">
                  {" "}
                  Shops Request
                </i>
              </NavLink>
              <NavLink className="dropdown-item" to="/toolRequestForm">
                <i className="fa fa-wrench" aria-hidden="true">
                  {" "}
                  Tool Request
                </i>
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
                to="/ownerVehicleRequestsHistory"
              >
                Vehicles
              </NavLink>
              <NavLink
                className="dropdown-item"
                to="/ownerHouseRequestsHistory"
              >
                Houses
              </NavLink>
              <NavLink className="dropdown-item" to="/ownerShopRequestsHistory">
                Shops
              </NavLink>
              <NavLink className="dropdown-item" to="/ownerToolRequestsHistory">
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
                Products status
              </i>
            </NavLink>
            <div
              style={{ background: "#2b455f" }}
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <NavLink className="dropdown-item" to="/ownerVehicles">
                Vehicles
              </NavLink>
              <NavLink className="dropdown-item" to="/ownerHouses">
                Houses
              </NavLink>
              <NavLink className="dropdown-item" to="/ownerShops">
                Shops
              </NavLink>
              <NavLink className="dropdown-item" to="/ownerTools">
                Tools
              </NavLink>
            </div>
          </li>

          <li>
            <Link to="#">
              <i className="fa fa-trash-o" aria-hidden="true">
                {" "}
                Delete Product
              </i>
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default ProductOwnerLeftNav;
