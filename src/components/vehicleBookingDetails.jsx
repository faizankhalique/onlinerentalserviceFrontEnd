import React, { Component } from "react";
import { getVehicleBooking } from "./services/vehicleBookingService";
import { Link } from "react-router-dom";
class VehicleBookingDetails extends Component {
  state = {
    vehicleBooking: {},
    vehicleImage: "",
    vehicleImages: [],
    vehicle: {}
  };
  async componentDidMount() {
    const { vehicleBookingId } = this.props.location.state;
    const { data: vehicleBooking } = await getVehicleBooking(vehicleBookingId);
    if (vehicleBooking) {
      let vehicle = vehicleBooking.vehicle;
      let vehicleImage = vehicleBooking.vehicle.vehicleImages[0];
      let vehicleImages = vehicleBooking.vehicle.vehicleImages;
      this.setState({ vehicleBooking, vehicleImage, vehicleImages, vehicle });
      console.log("vehicleBooking", vehicleBooking);
    }
  }
  handleImage = image => {
    this.setState({ vehicleImage: image });
  };
  render() {
    const { vehicleBooking, vehicleImage, vehicleImages, vehicle } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          {vehicleBooking && (
            <div className="row" style={{ padding: "4px" }}>
              <div className="col-md-6">
                <center>
                  {" "}
                  <h3>Vehicle Booking Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>VehicleName</th>
                      <td>
                        <Link
                          to={{
                            pathname: "/vehicleDetails",
                            state: {
                              vehicleId: vehicle._id,
                              admin: true
                            }
                          }}
                        >
                          {vehicle.vehicleName}
                        </Link>
                      </td>
                    </tr>

                    <tr>
                      <th>StartDate</th>
                      <td> {vehicleBooking.startDate}</td>
                    </tr>
                    <tr>
                      <th>EndDate</th>
                      <td> {vehicleBooking.endDate}</td>
                    </tr>

                    <tr>
                      <th>BookingConfirmation</th>
                      <td>{vehicleBooking.bookingConfirmation}</td>
                    </tr>
                    <tr>
                      <th>Rent</th>
                      <td>{vehicleBooking.rent}</td>
                    </tr>
                    <tr>
                      <th>Security</th>
                      <td>{vehicleBooking.security}</td>
                    </tr>
                  </thead>
                </table>
                <div />
              </div>
              <div className="col-md-4" style={{ marginTop: "65px" }}>
                <img
                  src={vehicleImage}
                  style={{ height: "400px", width: "500px" }}
                />
                <br />
                <br />
                {vehicleBooking &&
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
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default VehicleBookingDetails;
