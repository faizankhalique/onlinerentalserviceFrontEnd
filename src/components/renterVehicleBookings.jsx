import React, { Component } from "react";
import { toast } from "react-toastify";
import { getRenterVehiclesBookings } from "./services/vehicleBookingService";
import { Link } from "react-router-dom";
import authService from "./services/authService";
class RenterVehiclesBookings extends Component {
  state = { vehiclesBookoings: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: vehiclesBookings } = await getRenterVehiclesBookings(
        user._id
      );
      if (vehiclesBookings.length > 0) this.setState({ vehiclesBookings });
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { vehiclesBookings } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">VechileName</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Security</th>
                    <th scope="col">Rent</th>
                    <th scope="col">BookingStatus</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiclesBookings &&
                    vehiclesBookings.map(
                      vehiclesBooking =>
                        vehiclesBooking !== "Pending" && (
                          <tr key={vehiclesBooking._id}>
                            <td>{vehiclesBooking.vehicle.vehicleName}</td>
                            <td>{vehiclesBooking.startDate}</td>
                            <td>{vehiclesBooking.endDate}</td>
                            <td>{vehiclesBooking.payment.security}</td>
                            <td>{vehiclesBooking.payment.totalRent}</td>
                            <td>{vehiclesBooking.bookingStatus}</td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RenterVehiclesBookings;
