import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getRenterHouseBookings } from "../../services/properties/house/houseBookingService";
class RenterAllHousesBookingsDetails extends Component {
  state = { housesBookings: [] };
  async componentDidMount() {
    const { renterId } = this.props.location.state;
    try {
      const { data: housesBookings } = await getRenterHouseBookings(renterId);
      if (housesBookings) {
        this.setState({ housesBookings });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { housesBookings } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Location</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">TotalMonths</th>
                    <th scope="col">Security</th>
                    <th scope="col">BookingStatus</th>
                    <th scope="col">UpdateBooking</th>
                    <th scope="col">PaymentsDetails</th>
                  </tr>
                </thead>
                <tbody>
                  {housesBookings.map(
                    houseBooking =>
                      houseBooking.bookingStatus != "Pending" && (
                        <tr key={houseBooking._id}>
                          <td>{houseBooking.house.city}</td>
                          <td>{houseBooking.startDate}</td>
                          <td>{houseBooking.endDate}</td>
                          <td>{houseBooking.totalMonths}</td>
                          <td>{houseBooking.security}</td>
                          <td>{houseBooking.bookingStatus}</td>
                          <td>
                            <Link
                              style={{
                                visibility:
                                  houseBooking.bookingStatus == "Confirm"
                                    ? "visible"
                                    : "hidden"
                              }}
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
                            <Link
                              to={{
                                pathname: "/housePayments",
                                state: {
                                  houseBookingId: houseBooking._id,
                                  payments: houseBooking.payments
                                }
                              }}
                            >
                              <button className="btn btn-primary btn-sm">
                                Payments
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

export default RenterAllHousesBookingsDetails;
