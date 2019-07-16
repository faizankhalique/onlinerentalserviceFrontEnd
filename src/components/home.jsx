import React, { Component } from "react";
import http from "./services/httpService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getVehicles } from "./services/vehicleService";
import authService from "./services/authService";
// import UploadFiles from "./common/uploadFiles";
// import { async } from './services/registeredProductsService';
class Home extends Component {
  state = { vehicles: [] };
  async componentDidMount() {
    try {
      const { data: vehicles } = await getVehicles();
      if (vehicles) {
        this.setState({ vehicles });
        console.log("vehicles", vehicles);
      }
    } catch (error) {
      toast.error("" + error);
    }
  }

  // async componentDidMount() {
  //   try {
  //     const response = await http.get(
  //       "http://localhost:8000/api/vehicles/vehiclesimages"
  //     );
  //     if (response && response.data) {
  //       const { data: vehiclesImages } = response;

  //       this.setState({ vehiclesImages });
  //     }
  //   } catch (error) {
  //     toast.error("" + error);
  //   }
  // }

  render() {
    const { vehicles } = this.state;
    const user = authService.getCurrentUser();
    return (
      <React.Fragment>
        {vehicles.map(vehicle => (
          <div key={vehicle._id} style={{ display: "inline-block" }}>
            <img
              src={vehicle.vehicleImages[0]}
              style={{ margin: "10px" }}
              className="img-responsive"
              alt="Helpful alt text"
              width={300}
              height={250}
            />
            <h4 style={{ marginLeft: "12px" }}>
              {vehicle.vehicleName}
              {"  "}
              {vehicle.vehicleModel}
            </h4>
            <div style={{ marginLeft: "12px" }}>
              <Link
                to={{
                  pathname: "/vehicleDetails",
                  state: {
                    vehicleId: vehicle._id
                  }
                }}
              >
                <button
                  className="btn btn-outline-primary btn-sm"
                  style={{ margin: "2px" }}
                >
                  View Details
                </button>
              </Link>
              <Link
                to={
                  user && user.accountType === "renter"
                    ? "/vehicleRentRequestForm"
                    : "/registerUser"
                }
              >
                {" "}
                <button
                  className="btn btn-outline-primary btn-sm"
                  style={{ margin: "2px" }}
                  disabled={
                    (user && user.accountType === "admin") ||
                    (user && user.accountType === "productowner")
                      ? true
                      : false
                  }
                >
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Home;
