import React, { Component } from "react";
import { toast } from "react-toastify";
import { getVehiclesBookings } from "./services/vehicleBookingService";
import { Link } from "react-router-dom";

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
  handleBooking = requestId => {
    toast.success(requestId);
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
                    <th scope="col">Confirmation</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {vehiclesBookings &&
                    vehiclesBookings.map(
                      vehiclesBooking =>
                        vehiclesBooking.bookingConfirmation == "Pending" && (
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
                            <td>{vehiclesBooking.security}</td>
                            <td>{vehiclesBooking.rent}</td>
                            <td>{vehiclesBooking.bookingConfirmation}</td>
                            <td>
                              <Link
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
                                  Confirm
                                </button>
                              </Link>
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
          <div className="row">
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
                    <th scope="col">Confirmation</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {vehiclesBookings &&
                    vehiclesBookings.map(
                      vehiclesBooking =>
                        vehiclesBooking.bookingConfirmation == "Confirm" && (
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
                            <td>{vehiclesBooking.security}</td>
                            <td>{vehiclesBooking.rent}</td>
                            <td>{vehiclesBooking.bookingConfirmation}</td>
                            <td>
                              <Link
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
        </div>
      </React.Fragment>
    );
  }
}

export default VehiclesBookings;
