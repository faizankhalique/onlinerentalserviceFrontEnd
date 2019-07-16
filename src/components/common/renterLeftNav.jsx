import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <Link to="#">
              <i className="fa fa-bell" aria-hidden="true">
                {" "}
                Notification
              </i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-arrow-circle-right" aria-hidden="true">
                {" "}
                Products status
              </i>
            </Link>
          </li>
          <li>
            <Link to="/vehicleRentRequestForm">
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
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default RenterLeftNav;
