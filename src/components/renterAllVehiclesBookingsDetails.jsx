import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getRenterVehiclesBookings } from "./services/vehicleBookingService";
class RenterAllVehiclesBookingsDetails extends Component {
  state = { vehiclesBookings: [] };
  async componentDidMount() {
    const { renterId } = this.props.location.state;
    try {
      const { data: vehiclesBookings } = await getRenterVehiclesBookings(
        renterId
      );
      if (vehiclesBookings) {
        this.setState({ vehiclesBookings });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { vehiclesBookings } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">VechileName</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">BookingStatus</th>
                    <th scope="col">Days</th>
                    <th scope="col">TotalRent</th>
                    <th scope="col">OwnerRent</th>
                    <th scope="col">Commission</th>
                    <th scope="col">Security</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {vehiclesBookings.map(
                    vehiclesBooking =>
                      vehiclesBooking.bookingStatus != "Pending" && (
                        <tr key={vehiclesBooking._id}>
                          <td>{vehiclesBooking.vehicle.vehicleName}</td>
                          <td>{vehiclesBooking.startDate}</td>
                          <td>{vehiclesBooking.endDate}</td>
                          <td>{vehiclesBooking.bookingStatus}</td>
                          <td>{vehiclesBooking.payment.totalDays}</td>
                          <td>{vehiclesBooking.payment.totalRent}</td>
                          <td>{vehiclesBooking.payment.ownerRent}</td>
                          <td>{vehiclesBooking.payment.commission}</td>
                          <td>{vehiclesBooking.payment.security}</td>
                          <td>
                            <Link
                              style={{
                                visibility:
                                  vehiclesBooking.bookingStatus == "Confirm"
                                    ? "visible"
                                    : "hidden"
                              }}
                              to={{
                                pathname: "/confirmBooking",
                                state: {
                                  vehiclesBooking: vehiclesBooking
                                }
                              }}
                            >
                              <button
                                className="btn btn-primary btn-sm"
                                // onClick={() => {
                                //   this.handleBooking(vehiclesBooking._id);
                                // }}
                              >
                                Update
                              </button>
                            </Link>
                          </td>
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

export default RenterAllVehiclesBookingsDetails;
