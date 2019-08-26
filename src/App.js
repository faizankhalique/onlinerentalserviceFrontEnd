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
import RenterLeftNav from "./components/common/renterLeftNav";
import VehicleRentRequestForm from "./components/vehicleRentRequestForm";
import RenterNav from "./components/common/renterNav";
import VehicleRentRequests from "./components/vehicleRentRequests";
import VehicleRentRequestDetails from "./components/vehicleRentRequestDetails";
import ProductOwnerDetails from "./components/productOwnerDatails";
import VehiclesBookoings from "./components/vehiclesbookings";
import ConfirmBooking from "./components/confirmBooking";
import Renters from "./components/renters";
import RenterDetails from "./components/renterDetails";
import OwnerVehicleRequestsHistory from "./components/ownerVehicleRequestsHistory";
import OwnerVehicles from "./components/ownerVehicles";
import RenterVehicleRequestsHistory from "./components/renterVehiclesRequestsHistory";
import RenterVehiclesBookings from "./components/renterVehicleBookings";
import HouseRequestForm from "./components/properties/house/houseRequestForm";
import HouseRequests from "./components/properties/house/houseRequests";
import HouseRequestDetails from "./components/properties/house/houseRequestDetails";
import HouseDetails from "./components/properties/house/houseDetails";
import OwnerHouseRequestsHistory from "./components/properties/house/ownerHouseRequestHistory";
import ShopRequestForm from "./components/properties/shop/shopRequestForm";
import ShopRequests from "./components/properties/shop/shopRequests";
import ShopRequestDetails from "./components/properties/shop/shopRequestDetails";
import Shops from "./components/properties/shop/shops";
import ShopDetails from "./components/properties/shop/shopDetails";
import OwnerShopRequestsHistory from "./components/properties/shop/ownerShopRequestsHistory";
import OwnerHouses from "./components/properties/house/ownerHouses";
import OwnerShops from "./components/properties/shop/ownerShops";
import HouseRentRequestForm from "./components/properties/house/houseRentRequestForm";
import HouseRentRequests from "./components/properties/house/houseRentRequests";
import HouseRentRequestDetails from "./components/properties/house/houseRentRequestDetails";
import HouseBookings from "./components/properties/house/housesBookings";
import ConfirmHouseBooking from "./components/properties/house/confirmHouseBooking";
import ShopRentRequestForm from "./components/properties/shop/shopRentRequestForm";
import ShopRentRequests from "./components/properties/shop/shopRentRequests";
import ShopRentRequestDetails from "./components/properties/shop/shopRentRequestDetails";
import ShopBookings from "./components/properties/shop/shopsBookings";
import ConfirmShopBooking from "./components/properties/shop/confirmShopBooking";
import RenterHouseRequestsHistory from "./components/properties/house/renterHousesRequestsHistory";
import RenterShopRequestsHistory from "./components/properties/shop/renterShopsRequestsHistory";
import RenterHouesBookings from "./components/properties/house/renterHouseBooking";
import RenterShopsBookings from "./components/properties/shop/renterShopBookings";
import ToolRequestForm from "./components/tools/toolRequestForm";
import ToolRequests from "./components/tools/toolRequests";
import ToolRequestDetails from "./components/tools/toolRequestDetails";
import Tools from "./components/tools/tools";
import ToolDetails from "./components/tools/toolDetails";
import OwnerToolRequestsHistory from "./components/tools/ownerToolRequestsHistory";
import OwnerTools from "./components/tools/ownerTools";
import ToolRentRequestForm from "./components/tools/toolRentRequestForm";
import ToolRentRequests from "./components/tools/toolRentRequests";
import ToolRentRequestDetails from "./components/tools/toolRentRequestDetails";
import ToolBookings from "./components/tools/toolsBookings";
import ConfirmToolBooking from "./components/tools/confirmToolBooking";
import RenterToolRequestsHistory from "./components/tools/renterToolsRequestsHistory";
import RenterToolsBookings from "./components/tools/renterToolBookings";
import HousePayments from "./components/properties/house/housePayments";
import ShopPayments from "./components/properties/shop/shopPayments";
import VehicleBookingDetails from "./components/vehicleBookingDetails";
import HouseBookingDetails from "./components/properties/house/houseBookingDetails";
import ShopBookingDetails from "./components/properties/shop/shopBookingDetails";
import ToolBookingDetails from "./components/tools/toolBookingDetails";
import ContactUs from "./components/contactUs";

import "./App.css";
import Graph from "./components/graph";
import Report from "./components/report";
import OwnerAllVehiclesDetails from "./components/ownerAllVehiclesDetails";
import OwnerAllHousesDetails from "./components/properties/house/ownerAllHousesDetails";
import OwnerAllShopsDetails from "./components/properties/shop/ownerAllShopsDetails";
import OwnerAllToolsDetails from "./components/tools/ownerAllToolsDetails";
import RenterAllVehiclesBookingsDetails from "./components/renterAllVehiclesBookingsDetails";
import RenterAllToolsBookingsDetails from "./components/tools/renterAllToolsBookingsDetails";
import RenterAllHousesBookingsDetails from "./components/properties/house/renterAllHousesBookingsDetails";
import RenterAllShopsBookingsDetails from "./components/properties/shop/ownerAllShopsBookingsDetails";
import RenterHousePaymentHistory from "./components/properties/house/renterHousePaymentHistory";
import RenterShopPaymentHistory from "./components/properties/shop/renterShopPaymentHistory";
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
            <div
              className="wrapper"
              style={{ marginTop: "23px", background: "#E6F2F3" }}
            >
              {/* page-content */}
              <ToastContainer />
              <br />
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route path="/vehicleDetails" component={VehicleDetials} />
                <Route path="/houseDetails" component={HouseDetails} />
                <Route path="/shopDetails" component={ShopDetails} />
                <Route path="/toolDetails" component={ToolDetails} />

                <Route
                  path="/vehicleRentRequestForm"
                  component={VehicleRentRequestForm}
                />
                <Route
                  path="/houseRentRequestForm"
                  component={HouseRentRequestForm}
                />
                <Route
                  path="/shopRentRequestForm"
                  component={ShopRentRequestForm}
                />
                <Route
                  path="/toolRentRequestForm"
                  component={ToolRentRequestForm}
                />
                <Route path="/vehicles" component={Vehicle} />
                <Route path="/houses" component={House} />
                <Route path="/shops" component={Shops} />
                <Route path="/tools" component={Tools} />
                <Route path="/contactUs" component={ContactUs} />
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
              {/* <footer
                className="footer mt-auto py-3"
                style={{
                  backgroundColor: "#E0E0E0",
                  left: "0",
                  bottom: "0",
                  width: "100%",
                  height: "10%",
                  textAlign: "center"
                  // position: "fixed"
                }}
              >
                <div className="container">
                  <span className="text-text-muted">
                    2019 &copy; OnlineRentalService, All Rights Reserved
                  </span>
                </div>
              </footer> */}
              <footer
                className="footer mt-auto py-4"
                style={{ backgroundColor: "#2c3e50" }}
              >
                <div className="container">
                  <p className="m-0 text-center text-white">
                    2019 &copy; OnlineRentalService, All Rights Reserved
                  </p>
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
            currentPath === "/shops" ||
            currentPath === "/tools" ||
            currentPath === "/contactUs" ||
            currentPath === "/vehicleDetails" ||
            currentPath === "/houseDetails" ||
            currentPath === "/shopDetails" ||
            currentPath === "/toolDetails" ||
            currentPath === "/vehicleRentRequestForm" ||
            currentPath === "/houseRentRequestForm" ||
            currentPath === "/shopRentRequestForm" ||
            currentPath === "/toolRentRequestForm" ||
            currentPath === "/tools") && (
            <React.Fragment>
              <Navbar />
              <div
                className="wrapper"
                style={{ marginTop: "23px", background: "#E6F2F3" }}
              >
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
                  {user.accountType === "renter" && (
                    <Route
                      path="/houseRentRequestForm"
                      component={HouseRentRequestForm}
                    />
                  )}
                  {user.accountType === "renter" && (
                    <Route
                      path="/shopRentRequestForm"
                      component={ShopRentRequestForm}
                    />
                  )}
                  {user.accountType === "renter" && (
                    <Route
                      path="/toolRentRequestForm"
                      component={ToolRentRequestForm}
                    />
                  )}
                  <Route path="/vehicleDetails" component={VehicleDetials} />
                  <Route path="/vehicles" component={Vehicle} />
                  <Route path="/houses" component={House} />
                  <Route path="/houseDetails" component={HouseDetails} />
                  <Route path="/shops" component={Shops} />
                  <Route path="/shopDetails" component={ShopDetails} />
                  <Route path="/toolDetails" component={ToolDetails} />
                  <Route path="/tools" component={Tools} />
                  <Route exact path="/contactUs" component={ContactUs} />
                  <Route exact path="/" component={Home} />
                </Switch>
                {/* <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                       
                      </div>
                    </div>
                  </div> */}

                <footer className="py-4" style={{ backgroundColor: "#2c3e50" }}>
                  <div className="container">
                    <p className="m-0 text-center text-white">
                      2019 &copy; OnlineRentalService, All Rights Reserved
                    </p>
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
            currentPath === "/ownerVehicleRequestsHistory" ||
            currentPath === "/ownerHouseRequestsHistory" ||
            currentPath === "/ownerVehicles" ||
            currentPath === "/houseRequestForm" ||
            currentPath === "/ownerHouses" ||
            currentPath === "/shopRequestForm" ||
            currentPath === "/ownerShopRequestsHistory" ||
            currentPath === "/ownerShops" ||
            currentPath === "/toolRequestForm" ||
            currentPath === "/ownerToolRequestsHistory" ||
            currentPath === "/ownerTools" ||
            currentPath === "/logOut") && (
            <React.Fragment>
              {/* <Navbar /> */}
              <div className="wrapper" style={{ background: "#E6F2F3" }}>
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
                    <Route
                      path="/ownerVehicleRequestsHistory"
                      component={OwnerVehicleRequestsHistory}
                    />
                    <Route path="/ownerVehicles" component={OwnerVehicles} />
                    <Route path="/userProfile" component={UserProfile} />
                    <Route
                      path="/houseRequestForm"
                      component={HouseRequestForm}
                    />
                    <Route
                      path="/ownerHouseRequestsHistory"
                      component={OwnerHouseRequestsHistory}
                    />
                    <Route path="/ownerHouses" component={OwnerHouses} />
                    <Route
                      path="/shopRequestForm"
                      component={ShopRequestForm}
                    />
                    <Route
                      path="/toolRequestForm"
                      component={ToolRequestForm}
                    />
                    <Route
                      path="/ownerShopRequestsHistory"
                      component={OwnerShopRequestsHistory}
                    />
                    <Route path="/ownerShops" component={OwnerShops} />
                    <Route
                      path="/ownerToolRequestsHistory"
                      component={OwnerToolRequestsHistory}
                    />
                    <Route path="/ownerTools" component={OwnerTools} />
                    <Route path="/logOut" component={LogOut} />
                  </Switch>
                </div>
                {/* <footer
                  className="footer mt-auto py-4"
                  style={{ backgroundColor: "#2c3e50" }}
                >
                  <div className="container">
                    <p className="m-0 text-center text-white">
                      2019 &copy; OnlineRentalService, All Rights Reserved
                    </p>
                  </div>
                </footer> */}
              </div>
            </React.Fragment>
          )}
        {/* Renter View */}
        {user &&
          user.accountType === "renter" &&
          (currentPath === "/userProfile" ||
            currentPath === "/renterVehiclesRequestsHistory" ||
            currentPath === "/renterVehicleBookings" ||
            currentPath === "/renterHousesRequestsHistory" ||
            currentPath === "/renterHouseBookings" ||
            currentPath === "/renterShopsRequestsHistory" ||
            currentPath === "/renterShopBookings" ||
            currentPath === "/renterToolsRequestsHistory" ||
            currentPath === "/renterToolBookings" ||
            currentPath === "/renterHousePaymentHistory" ||
            currentPath === "/renterShopPaymentHistory" ||
            currentPath === "/logOut") && (
            <React.Fragment>
              {/* <Navbar /> */}
              <div className="wrapper" style={{ background: "#E6F2F3" }}>
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
                    <Route path="/userProfile" component={UserProfile} />
                    <Route path="/logOut" component={LogOut} />
                    <Route
                      path="/renterVehiclesRequestsHistory"
                      component={RenterVehicleRequestsHistory}
                    />
                    <Route
                      path="/renterVehicleBookings"
                      component={RenterVehiclesBookings}
                    />
                    <Route
                      path="/renterHousesRequestsHistory"
                      component={RenterHouseRequestsHistory}
                    />
                    <Route
                      path="/renterShopsRequestsHistory"
                      component={RenterShopRequestsHistory}
                    />
                    <Route
                      path="/renterHouseBookings"
                      component={RenterHouesBookings}
                    />
                    <Route
                      path="/renterShopBookings"
                      component={RenterShopsBookings}
                    />
                    <Route
                      path="/renterToolsRequestsHistory"
                      component={RenterToolRequestsHistory}
                    />
                    <Route
                      path="/renterToolBookings"
                      component={RenterToolsBookings}
                    />
                    <Route
                      path="/renterHousePaymentHistory"
                      component={RenterHousePaymentHistory}
                    />
                    <Route
                      path="/renterShopPaymentHistory"
                      component={RenterShopPaymentHistory}
                    />
                  </Switch>
                </div>
                {/* <footer
                  className="footer mt-auto py-4"
                  style={{ backgroundColor: "#2c3e50" }}
                >
                  <div className="container">
                    <p className="m-0 text-center text-white">
                      2019 &copy; OnlineRentalService, All Rights Reserved
                    </p>
                  </div>
                </footer> */}
              </div>
            </React.Fragment>
          )}

        {/* Admin View */}
        {user &&
          user.accountType === "admin" &&
          (currentPath === "/admin" ||
            currentPath === "/vehicleRequests" ||
            currentPath === "/updateVehicleRequest" ||
            currentPath === "/vehicleRequestDetails" ||
            currentPath === "/vehicleRentRequests" ||
            currentPath === "/vehicleRentRequestDetails" ||
            currentPath === "/owners" ||
            currentPath === "/renters" ||
            currentPath === "/productOwnerDetails" ||
            currentPath === "/renterDetails" ||
            currentPath === "/vehiclesBookings" ||
            currentPath === "/confirmBooking" ||
            currentPath === "/vehicleBookingDetails" ||
            currentPath === "/houseRequests" ||
            currentPath === "/houseRequestDetails" ||
            currentPath === "/updateHouseRequest" ||
            currentPath === "/houseRentRequests" ||
            currentPath === "/houseRentRequestDetails" ||
            currentPath === "/housesBookings" ||
            currentPath === "/houseBookingDetails" ||
            currentPath === "/housePayments" ||
            currentPath === "/confirmHouseBooking" ||
            currentPath === "/userProfile" ||
            currentPath === "/shopRequests" ||
            currentPath === "/shopRequestDetails" ||
            currentPath === "/updateShopRequest" ||
            currentPath === "/shopRentRequests" ||
            currentPath === "/shopRentRequestDetails" ||
            currentPath === "/shopsBookings" ||
            currentPath == "/shopBookingDetails" ||
            currentPath === "/confirmShopBooking" ||
            currentPath === "/shopPayments" ||
            currentPath === "/toolRequests" ||
            currentPath === "/toolRequestDetails" ||
            currentPath === "/toolRentRequests" ||
            currentPath === "/toolRentRequestDetails" ||
            currentPath === "/toolsBookings" ||
            currentPath === "/toolBookingDetails" ||
            currentPath === "/confirmToolBooking" ||
            currentPath === "/ownerAllVehiclesDetails" ||
            currentPath === "/ownerAllHousesDetails" ||
            currentPath === "/ownerAllShopsDetails" ||
            currentPath === "/ownerAllToolsDetails" ||
            currentPath === "/renterAllVehiclesBookingsDetails" ||
            currentPath === "/renterAllHousesBookingsDetails" ||
            currentPath === "/renterAllShopsBookingsDetails" ||
            currentPath === "/renterAllToolsBookingsDetails" ||
            currentPath === "/reports" ||
            currentPath === "/logOut") && (
            <React.Fragment>
              {/* <Navbar /> */}
              <div className="wrapper" style={{ background: "#E6F2F3" }}>
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
                      path="/updateVehicleRequest"
                      component={VehicleRequestForm}
                    />
                    <Route
                      path="/vehicleRequestDetails"
                      component={VehicleRequestDetails}
                    />

                    <Route
                      path="/vehicleRentRequests"
                      component={VehicleRentRequests}
                    />
                    <Route
                      path="/vehicleRentRequestDetails"
                      component={VehicleRentRequestDetails}
                    />
                    <Route
                      path="/productOwnerDetails"
                      component={ProductOwnerDetails}
                    />
                    <Route path="/renterDetails" component={RenterDetails} />
                    <Route
                      path="/vehiclesBookings"
                      component={VehiclesBookoings}
                    />
                    <Route
                      path="/vehicleBookingDetails"
                      component={VehicleBookingDetails}
                    />
                    <Route path="/confirmBooking" component={ConfirmBooking} />
                    <Route path="/houseRequests" component={HouseRequests} />
                    <Route
                      path="/houseRequestDetails"
                      component={HouseRequestDetails}
                    />
                    <Route
                      path="/houseRentRequests"
                      component={HouseRentRequests}
                    />
                    <Route
                      path="/houseRentRequestDetails"
                      component={HouseRentRequestDetails}
                    />
                    <Route path="/housesBookings" component={HouseBookings} />
                    <Route
                      path="/houseBookingDetails"
                      component={HouseBookingDetails}
                    />
                    <Route
                      path="/confirmHouseBooking"
                      component={ConfirmHouseBooking}
                    />
                    <Route path="/housePayments" component={HousePayments} />
                    <Route path="/shopRequests" component={ShopRequests} />
                    <Route
                      path="/shopRequestDetails"
                      component={ShopRequestDetails}
                    />
                    <Route
                      path="/updateHouseRequest"
                      component={HouseRequestForm}
                    />
                    <Route
                      path="/updateShopRequest"
                      component={ShopRequestForm}
                    />
                    <Route
                      path="/shopRentRequests"
                      component={ShopRentRequests}
                    />
                    <Route
                      path="/shopRentRequestDetails"
                      component={ShopRentRequestDetails}
                    />
                    <Route path="/shopsBookings" component={ShopBookings} />
                    <Route
                      path="/shopBookingDetails"
                      component={ShopBookingDetails}
                    />
                    <Route
                      path="/confirmShopBooking"
                      component={ConfirmShopBooking}
                    />
                    <Route path="/shopPayments" component={ShopPayments} />
                    <Route path="/toolRequests" component={ToolRequests} />
                    <Route
                      path="/toolRequestDetails"
                      component={ToolRequestDetails}
                    />
                    <Route
                      path="/toolRentRequests"
                      component={ToolRentRequests}
                    />
                    <Route
                      path="/toolRentRequestDetails"
                      component={ToolRentRequestDetails}
                    />
                    <Route path="/toolsBookings" component={ToolBookings} />
                    <Route
                      path="/toolBookingDetails"
                      component={ToolBookingDetails}
                    />
                    <Route
                      path="/confirmToolBooking"
                      component={ConfirmToolBooking}
                    />
                    <Route
                      path="/ownerAllVehiclesDetails"
                      component={OwnerAllVehiclesDetails}
                    />
                    <Route
                      path="/ownerAllHousesDetails"
                      component={OwnerAllHousesDetails}
                    />
                    <Route
                      path="/ownerAllShopsDetails"
                      component={OwnerAllShopsDetails}
                    />
                    <Route
                      path="/ownerAllToolsDetails"
                      component={OwnerAllToolsDetails}
                    />
                    <Route
                      path="/renterAllVehiclesBookingsDetails"
                      component={RenterAllVehiclesBookingsDetails}
                    />
                    <Route
                      path="/renterAllToolsBookingsDetails"
                      component={RenterAllToolsBookingsDetails}
                    />
                    <Route
                      path="/renterAllHousesBookingsDetails"
                      component={RenterAllHousesBookingsDetails}
                    />
                    <Route
                      path="/renterAllShopsBookingsDetails"
                      component={RenterAllShopsBookingsDetails}
                    />

                    <Route path="/userProfile" component={UserProfile} />
                    <Route path="/owners" component={Owners} />
                    <Route path="/renters" component={Renters} />
                    <Route path="/reports" component={Report} />
                    <Route path="/logOut" component={LogOut} />
                  </Switch>
                </div>
                {/* <footer
                  className="footer mt-auto py-4"
                  style={{ backgroundColor: "#2c3e50" }}
                >
                  <div className="container">
                    <p className="m-0 text-center text-white">
                      2019 &copy; OnlineRentalService, All Rights Reserved
                    </p>
                  </div>
                </footer> */}
              </div>
            </React.Fragment>
          )}

        {/* <-----------------not-found-----------------------> */}
        {currentPath !== "/" &&
          currentPath !== "/home" &&
          currentPath !== "/vehicles" &&
          currentPath !== "/tools" &&
          currentPath !== "/houses" &&
          currentPath !== "/shops" &&
          currentPath !== "/contactUs" &&
          currentPath !== "/vehicleRequestForm" &&
          currentPath !== "/updateVehicleRequest" &&
          currentPath !== "/vehicleRequestDetails" &&
          currentPath !== "/vehicleRequests" &&
          currentPath !== "/vehicleRentRequests" &&
          currentPath !== "/vehicleRentRequestDetails" &&
          currentPath !== "/vehiclesBookings" &&
          currentPath !== "/vehicleBookingDetails" &&
          currentPath !== "/productOwnerDetails" &&
          currentPath !== "/userProfile" &&
          currentPath !== "/logOut" &&
          currentPath !== "/registerUser" &&
          currentPath !== "/vehicleDetails" &&
          currentPath !== "/renterDetails" &&
          currentPath !== "/owners" &&
          currentPath !== "/renters" &&
          currentPath !== "/admin" &&
          currentPath !== "/renter" &&
          currentPath !== "/confirmBooking" &&
          currentPath !== "/ownerVehicleRequestsHistory" &&
          currentPath !== "/ownerVehicles" &&
          currentPath !== "/renterVehiclesRequestsHistory" &&
          currentPath !== "/renterVehicleBookings" &&
          currentPath !== "/houseRequestForm" &&
          currentPath !== "/updateHouseRequest" &&
          currentPath !== "/houseRequests" &&
          currentPath !== "/houseRequestDetails" &&
          currentPath !== "/houseDetails" &&
          currentPath !== "/ownerHouseRequestsHistory" &&
          currentPath !== "/ownerHouses" &&
          currentPath !== "/houseRentRequestForm" &&
          currentPath !== "/houseRentRequests" &&
          currentPath !== "/houseRentRequestDetails" &&
          currentPath !== "/housesBookings" &&
          currentPath !== "/houseBookingDetails" &&
          currentPath !== "/confirmHouseBooking" &&
          currentPath !== "/housePayments" &&
          currentPath !== "/renterHousesRequestsHistory" &&
          currentPath !== "/renterHouseBookings" &&
          currentPath !== "/shopRequestForm" &&
          currentPath !== "/shopRequests" &&
          currentPath !== "/shopRequestDetails" &&
          currentPath !== "/shopDetails" &&
          currentPath !== "/updateShopRequest" &&
          currentPath !== "/ownerShopRequestsHistory" &&
          currentPath !== "/ownerShops" &&
          currentPath !== "/shopRentRequestForm" &&
          currentPath !== "/shopRentRequests" &&
          currentPath !== "/shopRentRequestDetails" &&
          currentPath !== "/shopsBookings" &&
          currentPath !== "/shopBookingDetails" &&
          currentPath !== "/confirmShopBooking" &&
          currentPath !== "/renterShopsRequestsHistory" &&
          currentPath !== "/renterShopBookings" &&
          currentPath !== "/shopPayments" &&
          currentPath !== "/tools" &&
          currentPath !== "/toolDetails" &&
          currentPath !== "/toolRequestForm" &&
          currentPath !== "/toolRequests" &&
          currentPath !== "/toolRequestDetails" &&
          currentPath !== "/ownerToolRequestsHistory" &&
          currentPath !== "/ownerTools" &&
          currentPath !== "/toolRentRequestForm" &&
          currentPath !== "/toolRentRequests" &&
          currentPath !== "/toolRentRequestDetails" &&
          currentPath !== "/toolsBookings" &&
          currentPath !== "/toolBookingDetails" &&
          currentPath !== "/confirmToolBooking" &&
          currentPath !== "/renterToolsRequestsHistory" &&
          currentPath !== "/renterToolBookings" &&
          currentPath !== "/reports" &&
          currentPath !== "/ownerAllVehiclesDetails" &&
          currentPath !== "/ownerAllHousesDetails" &&
          currentPath !== "/ownerAllToolsDetails" &&
          currentPath !== "/ownerAllShopsDetails" &&
          currentPath !== "/renterAllVehiclesBookingsDetails" &&
          currentPath !== "/renterAllHousesBookingsDetails" &&
          currentPath !== "/renterAllShopsBookingsDetails" &&
          currentPath !== "/renterAllToolsBookingsDetails" &&
          currentPath !== "/renterHousePaymentHistory" &&
          currentPath !== "/renterShopPaymentHistory" &&
          currentPath !== "/vehicleRentRequestForm" && (
            <React.Fragment>
              <div
                className="wrapper"
                style={{ marginTop: "40px", background: "#dedede" }}
              >
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
