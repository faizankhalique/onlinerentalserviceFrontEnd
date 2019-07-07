import React, { Component } from "react";
import { getVehicle } from "./components/services/vehicleService";
import { toast } from "react-toastify";
class VehicleDetials extends Component {
  state = { vehicle: {}, vehicleImage: "" };
  async componentDidMount() {
    // // const { handle } = this.props.match.params;
    // const { vehicle } = this.props.location.state;
    // if (vehicle) {
    // }

    try {
      const { vehicleId } = this.props.location.state;
      console.log("Id", vehicleId);
      const { data: vehicle } = await getVehicle(vehicleId);
      if (vehicle) {
        const vehicleImage = vehicle.vehicleImages[0];
        this.setState({ vehicle, vehicleImage });
        console.log(vehicle.vehicleName);
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { vehicle, vehicleImage } = this.state;
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
                      <th scope="col">VehicleName</th>
                      <td scope="col">{vehicle.vehicleName}</td>
                    </tr>
                    <tr>
                      <th scope="col">VehicleModel</th>
                      <td scope="col">{vehicle.vehicleModel}</td>
                    </tr>
                    <tr>
                      <th scope="col">VehicleN0</th>
                      <td scope="col"> {vehicle.vehicleNo}</td>
                    </tr>
                    <tr>
                      <th scope="col">VehicleType</th>
                      <td scope="col">{vehicle.vehicleType}</td>
                    </tr>
                    <tr>
                      <th scope="col">VehicleColour</th>
                      <td scope="col">{vehicle.vehicleColour}</td>
                    </tr>
                    <tr>
                      <th scope="col">VehicleCompany</th>
                      <td scope="col">{vehicle.vehicleCompany}</td>
                    </tr>
                    <tr>
                      <th scope="col">VehicleRent</th>
                      <td scope="col">{vehicle.vehicleRent}</td>
                    </tr>
                  </thead>
                </table>
                <button
                  className="btn btn-primary btn-sm btn-block"
                  style={{ marginBottom: "4px" }}
                >
                  Book Now
                </button>
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
