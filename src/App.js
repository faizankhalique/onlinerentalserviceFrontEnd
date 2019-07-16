import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import bg from "..public/background/bg.jpg";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Vehicle from "./components/vehicles";
import House from "./components/houses";
import Tool from "./components/tools";
import Admin from "./components/admin";
import NotFound from "./components/notFound";
import RegisterUser from "./components/registerUser";
import UserProfile from "./components/userProfile";
import LogOut from "./components/logOut";
import ProductOwnerLeftNav from "./components/common/productOwnerLeftNav";
import authService from "./components/services/authService";
import VehicleRequestForm from "./components/vehicleRequestForm";
import AdminLeftNav from "./components/common/adminLeftNav";
import OwnerNav from "./components/common/ownerNav";
import AdminNav from "./components/common/adminNav";
import VehicleRequests from "./components/vehiclesRequests";
import VehicleRequestDetails from "./components/vehicleRequestDetails";
import VehicleDetials from "./components/vehicleDetails";
import Owners from "./components/owners";
import "./App.css";
import RenterLeftNav from "./components/common/renterLeftNav";
import VehicleRentRequestForm from "./components/vehicleRentRequestForm";
import RenterNav from "./components/common/renterNav";

class App extends Component {
  render() {
    const user = authService.getCurrentUser();
    // console.log(bg);
    const currentPath = window.location.pathname;
    // console.log("path", window.location.href);
    return (
      <React.Fragment>
        {/* public View */}
        {!user && (
          <React.Fragment>
            <Navbar />
            <div className="wrapper" style={{ marginTop: "50px" }}>
              {/* page-content */}
              <ToastContainer />
              <br />
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route path="/vehicleDetails" component={VehicleDetials} />
                <Route
                  path="/vehicleRentRequestForm"
                  component={VehicleRentRequestForm}
                />
                <Route path="/vehicles" component={Vehicle} />
                <Route path="/houses" component={House} />
                <Route path="/tools" component={Tool} />
                <Route path="/registerUser" component={RegisterUser} />
                <Route exact path="/" component={Home} />
              </Switch>
              {/* <div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      
                    </div>
                  </div>
                </div>
              </div> */}
              <footer
                className="footer mt-auto py-3"
                style={{
                  backgroundColor: "#E0E0E0",
                  left: "0",
                  bottom: "0",
                  width: "100%",
                  height: "10%",
                  textAlign: "center"
                }}
              >
                <div className="container">
                  <span className="text-text-muted">
                    2019 &copy; OnlineRentalService, All Rights Reserved
                  </span>
                </div>
              </footer>
            </div>
          </React.Fragment>
        )}
        {/* Common-public View */}
        {user &&
          (user.accountType === "admin" ||
            user.accountType === "productowner" ||
            user.accountType === "renter") &&
          (currentPath === "/" ||
            currentPath === "/home" ||
            currentPath === "/vehicles" ||
            currentPath === "/houses" ||
            currentPath === "/vehicleDetails" ||
            currentPath === "/vehicleRentRequestForm" ||
            currentPath === "/tools") && (
            <React.Fragment>
              <Navbar />
              <div className="wrapper" style={{ marginTop: "50px" }}>
                {/* page-content */}
                <ToastContainer />
                <br />
                <Switch>
                  <Route exact path="/home" component={Home} />
                  {user.accountType === "renter" && (
                    <Route
                      path="/vehicleRentRequestForm"
                      component={VehicleRentRequestForm}
                    />
                  )}
                  <Route path="/vehicleDetails" component={VehicleDetials} />
                  <Route path="/vehicles" component={Vehicle} />
                  <Route path="/houses" component={House} />
                  <Route path="/tools" component={Tool} />
                  <Route exact path="/" component={Home} />
                </Switch>
                {/* <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                       
                      </div>
                    </div>
                  </div> */}

                <footer
                  className="footer mt-auto py-3"
                  style={{
                    backgroundColor: "#E0E0E0",
                    left: "0",
                    bottom: "0",
                    width: "100%",
                    height: "10%",
                    textAlign: "center"
                  }}
                >
                  <div className="container">
                    <span className="text-text-muted">
                      2019 &copy; OnlineRentalService, All Rights Reserved
                    </span>
                  </div>
                </footer>
              </div>
            </React.Fragment>
          )}

        {/* productowner View */}
        {user &&
          user.accountType === "productowner" &&
          (currentPath === "/vehicleRequestForm" ||
            currentPath === "/userProfile" ||
            currentPath === "/logOut") && (
            <React.Fragment>
              {/* <Navbar /> */}
              <div className="wrapper">
                {/* sidebar */}
                <div className="left-nav">
                  <ProductOwnerLeftNav />
                </div>
                {/* page-content */}
                <div className="page-content-wrapper">
                  <OwnerNav />
                  <ToastContainer />

                  <br />
                  <Switch>
                    <Route
                      path="/vehicleRequestForm"
                      component={VehicleRequestForm}
                    />

                    <Route path="/userProfile" component={UserProfile} />
                    <Route path="/logOut" component={LogOut} />
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          )}
        {/* Renter View */}
        {user &&
          user.accountType === "renter" &&
          (currentPath === "/userProfile" ||
            // currentPath === "/vehicleRentRequestForm" ||
            currentPath === "/logOut") && (
            <React.Fragment>
              {/* <Navbar /> */}
              <div className="wrapper">
                {/* sidebar */}
                <div className="left-nav">
                  <RenterLeftNav />
                </div>
                {/* page-content */}
                <div className="page-content-wrapper">
                  <RenterNav />
                  <ToastContainer />

                  <br />
                  <Switch>
                    {/* <Route
                      path="/vehicleRentRequestForm"
                      component={VehicleRentRequestForm}
                    /> */}

                    <Route path="/userProfile" component={UserProfile} />
                    <Route path="/logOut" component={LogOut} />
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          )}

        {/* Admin View */}
        {user &&
          user.accountType === "admin" &&
          (currentPath === "/admin" ||
            currentPath === "/vehicleRequests" ||
            currentPath === "/vehicleRequestDetails" ||
            currentPath === "/owners" ||
            currentPath === "/userProfile" ||
            currentPath === "/logOut") && (
            <React.Fragment>
              {/* <Navbar /> */}
              <div className="wrapper">
                {/* sidebar */}
                <div className="left-nav">
                  <AdminLeftNav />
                </div>
                {/* page-content */}
                <div className="page-content-wrapper">
                  <AdminNav />
                  <ToastContainer />

                  {/* <br /> */}
                  <Switch>
                    <Route path="/admin" component={Admin} />
                    <Route
                      path="/vehicleRequests"
                      component={VehicleRequests}
                    />

                    <Route
                      path="/vehicleRequestDetails"
                      component={VehicleRequestDetails}
                    />
                    <Route path="/userProfile" component={UserProfile} />
                    <Route path="/owners" component={Owners} />
                    <Route path="/logOut" component={LogOut} />
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          )}

        {/* <-----------------not-found-----------------------> */}
        {currentPath !== "/" &&
          currentPath !== "/home" &&
          currentPath !== "/vehicles" &&
          currentPath !== "/tools" &&
          currentPath !== "/houses" &&
          currentPath !== "/vehicleRequestForm" &&
          currentPath !== "/vehicleRequestDetails" &&
          currentPath !== "/vehicleRequests" &&
          currentPath !== "/userProfile" &&
          currentPath !== "/logOut" &&
          currentPath !== "/registerUser" &&
          currentPath !== "/vehicleDetails" &&
          currentPath !== "/owners" &&
          currentPath !== "/admin" &&
          currentPath !== "/renter" &&
          currentPath !== "/vehicleRentRequestForm" && (
            <React.Fragment>
              <div className="wrapper" style={{ marginTop: "40px" }}>
                {/* page-content */}
                <div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <ToastContainer />
                        <br />
                        <Switch>
                          <Route path="/not-found" component={NotFound} />
                          <Redirect to="/not-found" />
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

export default App;
