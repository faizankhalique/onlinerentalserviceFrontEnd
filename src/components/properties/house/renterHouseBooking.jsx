import React, { Component } from "react";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { getRenterHouseBookings } from "../../services/properties/house/houseBookingService";
import { Link } from "react-router-dom";
class RenterHouesBookings extends Component {
  state = { houseBookings: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: houseBookings } = await getRenterHouseBookings(user._id);
      if (houseBookings.length > 0) this.setState({ houseBookings });
    } catch (error) {
      toast.error("" + error);
    }
  }
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
                    <th scope="col">HouseLocation</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">TotalMonths</th>
                    <th scope="col">Security</th>
                    <th scope="col">BookingStatus</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {houseBookings &&
                    houseBookings.map(
                      houseBooking =>
                        houseBooking.bookingStatus !== "Pending" && (
                          <tr key={houseBooking._id}>
                            <td>
                              {houseBooking.house.city}
                              {"_"}
                              {houseBooking.house.location}
                            </td>
                            <td>{houseBooking.startDate}</td>
                            <td>{houseBooking.endDate}</td>
                            <td>{houseBooking.totalMonths}</td>
                            <td>{houseBooking.security}</td>
                            <td>{houseBooking.bookingStatus}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterHousePaymentHistory",
                                  state: {
                                    payments: houseBooking.payments,
                                    houseBookingId: houseBooking._id
                                  }
                                }}
                              >
                                <button className="btn btn-sm btn-primary">
                                  PaymentsDetails
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

export default RenterHouesBookings;
