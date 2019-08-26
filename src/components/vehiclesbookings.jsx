import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  getVehiclesBookings,
  confirmVehicleBooking
} from "./services/vehicleBookingService";
import { Link } from "react-router-dom";
import { addVehiclesBooking } from "./services/allRegisterRenters";

class VehiclesBookings extends Component {
  state = { vehiclesBookings: [] };
  async componentDidMount() {
    try {
      const { data: vehiclesBookings } = await getVehiclesBookings();
      if (vehiclesBookings) this.setState({ vehiclesBookings });
    } catch (error) {
      toast.error("" + error);
    }
  }
  handleBooking = async (bookingId, renterId) => {
    try {
      const confirm = window.confirm("Do you want to confirm Vehicle Booking?");
      if (confirm) {
        const { data } = await confirmVehicleBooking(bookingId);
        if (data) {
          toast.success("vehicle Booking Confirm successfully");
          const { data: result2 } = await addVehiclesBooking({
            bookingId: bookingId,
            renterId: renterId
          });
          if (result2)
            toast.success("Booking add into AllRegisterRenters Successfully");
          setTimeout(() => {
            window.location.pathname = "/renters";
          }, 2000);
        }
      }
    } catch (error) {
      toast.error(error + "");
    }
  };
  handleDelete = requestId => {
    const isConfim = window.confirm("Do you want to Delete?");
    if (isConfim) {
      toast.error(requestId);
    }
  };
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
                    <th scope="col">RequesterName</th>
                    <th scope="col">VechileName</th>
                    <th scope="col">VechileOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Security</th>
                    <th scope="col">Rent</th>
                    <th scope="col">BookingStatus</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {vehiclesBookings &&
                    vehiclesBookings.map(
                      vehiclesBooking =>
                        vehiclesBooking.bookingStatus == "Pending" && (
                          <tr key={vehiclesBooking._id}>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterDetails",
                                  state: {
                                    renterId: vehiclesBooking.renter._id
                                  }
                                }}
                              >
                                {vehiclesBooking.renter.fullName}
                              </Link>
                            </td>
                            <td>{vehiclesBooking.vehicle.vehicleName}</td>
                            <td>{vehiclesBooking.owner.fullName}</td>
                            <td>{vehiclesBooking.startDate}</td>
                            <td>{vehiclesBooking.endDate}</td>
                            <td>{vehiclesBooking.payment.security}</td>
                            <td>{vehiclesBooking.payment.totalRent}</td>
                            <td>{vehiclesBooking.bookingStatus}</td>
                            <td>
                              {/* <Link
                                to={{
                                  pathname: "/confirmBooking",
                                  state: {
                                    vehiclesBooking: vehiclesBooking
                                  }
                                }}
                              >
                                </Link> */}
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  this.handleBooking(
                                    vehiclesBooking._id,
                                    vehiclesBooking.renter._id
                                  );
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  this.handleDelete(vehiclesBooking._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="row">
            <h3 style={{ marginLeft: "350px" }}>Confirm Booking Table</h3>

            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">VechileName</th>
                    <th scope="col">VechileOwner</th>
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
                        vehiclesBooking.bookingStatus != "Pending" && (
                          <tr key={vehiclesBooking._id}>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterDetails",
                                  state: {
                                    renterId: vehiclesBooking.renter._id
                                  }
                                }}
                              >
                                {vehiclesBooking.renter.fullName}
                              </Link>
                            </td>
                            <td>{vehiclesBooking.vehicle.vehicleName}</td>
                            <td>{vehiclesBooking.owner.fullName}</td>
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
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default VehiclesBookings;
