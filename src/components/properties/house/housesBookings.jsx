import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getHouseRentRequests } from "../../services/properties/house/houseBookingService";
class HouseBookings extends Component {
  state = { houseBookings: [] };
  async componentDidMount() {
    try {
      const { data: houseBookings } = await getHouseRentRequests();
      if (houseBookings) this.setState({ houseBookings });
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
    const { houseBookings } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">HouseLocation</th>
                    <th scope="col">HouseOwner</th>
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
                  {houseBookings &&
                    houseBookings.map(
                      houseBooking =>
                        houseBooking.bookingConfirmation == "Pending" && (
                          <tr key={houseBooking._id}>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterDetails",
                                  state: {
                                    renterId: houseBooking.renter._id
                                  }
                                }}
                              >
                                {houseBooking.renter.fullName}
                              </Link>
                            </td>
                            <td>{houseBooking.house.city}</td>
                            <td>{houseBooking.owner.fullName}</td>
                            <td>{houseBooking.startDate}</td>
                            <td>{houseBooking.endDate}</td>
                            <td>{houseBooking.security}</td>
                            <td>{houseBooking.rent}</td>
                            <td>{houseBooking.bookingConfirmation}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/confirmHouseBooking",
                                  state: {
                                    houseBooking: houseBooking
                                  }
                                }}
                              >
                                <button
                                  className="btn btn-primary btn-sm"
                                  // onClick={() => {
                                  //   this.handleBooking(houseBooking._id);
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
                                  this.handleDelete(houseBooking._id);
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
                  {houseBookings &&
                    houseBookings.map(
                      houseBooking =>
                        houseBooking.bookingConfirmation == "Confirm" && (
                          <tr key={houseBooking._id}>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterDetails",
                                  state: {
                                    renterId: houseBooking.renter._id
                                  }
                                }}
                              >
                                {houseBooking.renter.fullName}
                              </Link>
                            </td>
                            <td>{houseBooking.house.city}</td>
                            <td>{houseBooking.owner.fullName}</td>
                            <td>{houseBooking.startDate}</td>
                            <td>{houseBooking.endDate}</td>
                            <td>{houseBooking.security}</td>
                            <td>{houseBooking.rent}</td>
                            <td>{houseBooking.bookingConfirmation}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/confirmHouseBooking",
                                  state: {
                                    houseBooking: houseBooking
                                  }
                                }}
                              >
                                <button
                                  className="btn btn-primary btn-sm"
                                  // onClick={() => {
                                  //   this.handleBooking(houseBooking._id);
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
                                  this.handleDelete(houseBooking._id);
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

export default HouseBookings;
