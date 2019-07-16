import React, { Component } from "react";
import { getVehicle } from "./services/vehicleService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import authService from "./services/authService";
class VehicleDetials extends Component {
  state = { vehicle: {}, vehicleImage: "", admin: false };
  async componentDidMount() {
    // // const { handle } = this.props.match.params;
    // const { vehicle } = this.props.location.state;
    // if (vehicle) {
    // }

    try {
      const { vehicleId, admin } = this.props.location.state;
      console.log("Admin", admin);
      const { data: vehicle } = await getVehicle(vehicleId);
      if (vehicle) {
        const vehicleImage = vehicle.vehicleImages[0];
        this.setState({ vehicle, vehicleImage, admin });
        console.log(vehicle.vehicleName);
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const user = authService.getCurrentUser();
    const { vehicle, vehicleImage, admin } = this.state;
    return (
      <React.Fragment>
        {vehicle && (
          <div
            className="container-fluid"
            style={{
              border: "1px solid black"
            }}
          >
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
                    to={
                      user && user.accountType === "renter"
                        ? "/vehicleRentRequestForm"
                        : "/registerUser"
                    }
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
                  style={{ height: "350px", width: "450px" }}
                />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default VehicleDetials;
