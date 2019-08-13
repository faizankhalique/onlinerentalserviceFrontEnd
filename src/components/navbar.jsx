import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import Login from "./login";
import authService from "./services/authService";
class Navbar extends Component {
  state = {};
  render() {
    const user = authService.getCurrentUser();
    return (
      <React.Fragment>
        <nav
          className="navbar  fixed-top navbar-expand-lg navbar-dark"
          style={{ height: "70px", background: "#2c3e50" }}
        >
          <Link className="navbar-brand" to="/">
            <img
              src={"images/logo.png"}
              alt="zyx"
              style={{
                width: "136px",
                height: "70px"
              }}
            />
          </Link>
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
              <li className="nav-item">
                <NavLink
                  style={{ color: "white" }}
                  className="nav-link"
                  to="/home"
                >
                  <b>Home</b> <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  style={{ color: "white" }}
                  className="nav-link"
                  to="/vehicles"
                >
                  <i className="fa fa-car" aria-hidden="true">
                    {" "}
                    <b>Vehicles</b>
                  </i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  style={{ color: "white" }}
                  className="nav-link"
                  to="/houses"
                >
                  <i className="fa fa-home" aria-hidden="true">
                    {" "}
                    <b>Houses</b>
                  </i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  style={{ color: "white" }}
                  className="nav-link"
                  to="/shops"
                >
                  <i className="fa fa-home" aria-hidden="true">
                    {" "}
                    <b>Shops</b>
                  </i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  style={{ color: "white" }}
                  className="nav-link"
                  to="/tools"
                >
                  <i className="fa fa-wrench" aria-hidden="true">
                    <b>Tools</b>
                  </i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink style={{ color: "white" }} className="nav-link" to="#">
                  <i className="fa fa-phone" aria-hidden="true">
                    {" "}
                    <b>Contact us</b>
                  </i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink style={{ color: "white" }} className="nav-link" to="#">
                  <b>About</b>
                </NavLink>
              </li>
              {/* {!user && (
                <React.Fragment>
                  <li  className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/log-in"
                      data-toggle="modal"
                      data-target="#login"
                      data-whatever="@mdo"
                    >
                      <i className="fa fa-sign-in" aria-hidden="true" />
                      <b>Log-in</b>
                    </NavLink>
                  </li>
                  <li  className="nav-item">
                    <NavLink className="nav-link" to="/registerUser">
                      <i className="fa fa-user-plus" aria-hidden="true" />
                      <b>Account</b>
                    </NavLink>
                  </li>
                </React.Fragment>
              )} */}
              {/* {user && (
                <React.Fragment>
                  <li  className="nav-item">
                    <NavLink className="nav-link" to="/userProfile">
                      <i className="fa fa-user" aria-hidden="true" />
                      <b>{user.fullName}</b>
                    </NavLink>
                  </li>
                  <li  className="nav-item">
                    <NavLink className="nav-link" to="/logOut">
                      <i className="fa fa-sign-out" aria-hidden="true" />
                      <b>Logout</b>
                    </NavLink>
                  </li>
                </React.Fragment>
              )} */}
            </ul>
            <ul className="navbar-nav">
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink
                      style={{ color: "white" }}
                      className="nav-link"
                      to="/registerUser"
                    >
                      <i className="fa fa-user-plus" aria-hidden="true">
                        <b>Account</b>
                      </i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="#"
                      data-toggle="modal"
                      data-target="#login"
                      data-whatever="@mdo"
                      style={{ color: "white" }}
                    >
                      <i className="fa fa-sign-in" aria-hidden="true">
                        <b>Log-in</b>
                      </i>
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <li className="nav-item" style={{ marginTop: "9px" }}>
                    <NavLink
                      style={{ color: "white" }}
                      className="nav-link"
                      to="/logOut"
                    >
                      <i className="fa fa-sign-out" aria-hidden="true">
                        <b>Logout</b>
                      </i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      style={{ color: "white" }}
                      className="nav-link"
                      to="/userProfile"
                    >
                      <img
                        src={user.userImage}
                        alt="zyx"
                        style={{
                          width: "60px",
                          height: "50px",
                          borderRadius: "50%"
                        }}
                      />
                      {/* <i className="fa fa-user" aria-hidden="true" /> */}
                      <b>{user.fullName}</b>
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
        <Login />
      </React.Fragment>
    );
  }
}

export default Navbar;
