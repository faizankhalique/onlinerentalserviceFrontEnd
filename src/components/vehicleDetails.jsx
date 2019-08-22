import React, { Component } from "react";
import { getVehicle } from "./services/vehicleService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import authService from "./services/authService";
class VehicleDetials extends Component {
  state = {
    vehicle: {},
    vehicleImage: "",
    vehicleImages: [],
    admin: false,
    user: {}
  };
  async componentDidMount() {
    // // const { handle } = this.props.match.params;
    // const { vehicle } = this.props.location.state;
    // if (vehicle) {
    // }

    try {
      const { vehicleId, admin } = this.props.location.state;
      const user = authService.getCurrentUser();
      const { data: vehicle } = await getVehicle(vehicleId);
      if (vehicle) {
        const vehicleImage = vehicle.vehicleImages[0];
        this.setState({
          vehicle,
          vehicleImage,
          admin,
          user,
          vehicleImages: vehicle.vehicleImages
        });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  handleImage = image => {
    this.setState({ vehicleImage: image });
  };
  render() {
    const { vehicle, vehicleImage, vehicleImages, admin, user } = this.state;
    return (
      <React.Fragment>
        {vehicle && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <center>
                  {" "}
                  <h3>Vehicle Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>VehicleName</th>
                      <td>{vehicle.vehicleName}</td>
                    </tr>
                    <tr>
                      <th>VehicleModel</th>
                      <td>{vehicle.vehicleModel}</td>
                    </tr>
                    <tr>
                      <th>VehicleN0</th>
                      <td>{vehicle.vehicleNo}</td>
                    </tr>
                    <tr>
                      <th>VehicleType</th>
                      <td>{vehicle.vehicleType}</td>
                    </tr>
                    <tr>
                      <th>VehicleColour</th>
                      <td>{vehicle.vehicleColour}</td>
                    </tr>
                    <tr>
                      <th>VehicleCompany</th>
                      <td>{vehicle.vehicleCompany}</td>
                    </tr>
                    <tr>
                      <th>VehicleRent</th>
                      <td>{vehicle.vehicleRent}</td>
                    </tr>
                    {admin && (
                      <React.Fragment>
                        <tr>
                          <th>MemberShipDuration</th>
                          <td>{vehicle.memberShipDuration}</td>
                        </tr>
                        <tr>
                          <th>Registred</th>
                          <td>{vehicle.registered.toString()}</td>
                        </tr>
                        <tr>
                          <th>VehicleOnRent</th>
                          <td>{vehicle.onRent.toString()}</td>
                        </tr>
                      </React.Fragment>
                    )}
                  </thead>
                </table>
                {admin || (
                  // <button
                  //   className="btn btn-primary btn-sm btn-block"
                  //   style={{ marginBottom: "4px" }}
                  // >
                  //   Book Now
                  // </button>
                  <Link
                    to={{
                      pathname:
                        user && user.accountType === "renter"
                          ? "/vehicleRentRequestForm"
                          : "/registerUser",
                      state: {
                        vehicle: vehicle
                      }
                    }}
                  >
                    {" "}
                    <button
                      className="btn btn-primary btn-sm btn-block"
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
                )}
              </div>
              <div
                className="col-md-6"
                style={{ marginTop: "65px", marginLeft: "60px" }}
              >
                <img
                  src={vehicleImage}
                  style={{ height: "400px", width: "550px" }}
                />
                <br />
                <br />
                {vehicle &&
                  vehicleImages.map(image => (
                    <img
                      key={image}
                      src={image}
                      style={{ height: "50px", width: "50px", margin: "8px" }}
                      onClick={() => {
                        this.handleImage(image);
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default VehicleDetials;
