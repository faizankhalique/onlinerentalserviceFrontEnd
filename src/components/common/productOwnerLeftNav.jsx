import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <Link to="/vehicleRequestForm">
              <i className="fa fa-bus" aria-hidden="true">
                {" "}
                Add Vehicle Request
              </i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-home" aria-hidden="true">
                Add Property Request
              </i>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className="fa fa-wrench" aria-hidden="true">
                {" "}
                Add Tool Request
              </i>
            </Link>
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
