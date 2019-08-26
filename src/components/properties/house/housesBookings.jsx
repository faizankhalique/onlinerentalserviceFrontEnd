import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  confirmHouseBooking,
  getHouseBookings
} from "../../services/properties/house/houseBookingService";
import { addHouseBooking } from "../../services/allRegisterRenters";
class HouseBookings extends Component {
  state = { houseBookings: [] };
  async componentDidMount() {
    try {
      const { data: houseBookings } = await getHouseBookings();
      if (houseBookings) this.setState({ houseBookings });
    } catch (error) {
      toast.error("" + error);
    }
  }
  handleBooking = async (bookingId, renterId) => {
    try {
      const confirm = window.confirm("Do you want to confirm Tool Booking?");
      if (confirm) {
        const { data } = await confirmHouseBooking(bookingId);
        if (data) {
          toast.success("Tool Booking Confirm successfully");
          const { data: result2 } = await addHouseBooking({
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

                    <th scope="col">BookingStatus</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {houseBookings &&
                    houseBookings.map(
                      houseBooking =>
                        houseBooking.bookingStatus == "Pending" && (
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
                            <td>{houseBooking.bookingStatus}</td>
                            <td>
                              {/* <Link
                                to={{
                                  pathname: "/confirmHouseBooking",
                                  state: {
                                    houseBooking: houseBooking
                                  }
                                }}
                              >
                              </Link> */}
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  this.handleBooking(
                                    houseBooking._id,
                                    houseBooking.renter._id
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
          {/* <div className="row">
            <h3 style={{ marginLeft: "350px" }}>Confirm Booking Table</h3>

            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">HouseLocation</th>
                    <th scope="col">HouseOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">BookingStatus</th>
                  </tr>
                </thead>
                <tbody>
                  {houseBookings &&
                    houseBookings.map(
                      houseBooking =>
                        houseBooking.bookingStatus === "Confirm" && (
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
                            <td>{houseBooking.bookingStatus}</td>
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

export default HouseBookings;
