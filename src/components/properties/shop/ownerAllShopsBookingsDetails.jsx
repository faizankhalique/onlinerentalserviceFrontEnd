import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getRenterShopBookings } from "../../services/properties/shop/shopBookingService";

class RenterAllShopsBookingsDetails extends Component {
  state = { shopsBookings: [] };
  async componentDidMount() {
    const { renterId } = this.props.location.state;
    try {
      const { data: shopsBookings } = await getRenterShopBookings(renterId);
      if (shopsBookings) {
        this.setState({ shopsBookings });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { shopsBookings } = this.state;
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
                  {shopsBookings.map(
                    shopBooking =>
                      shopBooking.bookingStatus != "Pending" && (
                        <tr key={shopBooking._id}>
                          <td>{shopBooking.shop.city}</td>
                          <td>{shopBooking.startDate}</td>
                          <td>{shopBooking.endDate}</td>
                          <td>{shopBooking.totalMonths}</td>
                          <td>{shopBooking.security}</td>
                          <td>{shopBooking.bookingStatus}</td>
                          <td>
                            <Link
                              style={{
                                visibility:
                                  shopBooking.bookingStatus == "Confirm"
                                    ? "visible"
                                    : "hidden"
                              }}
                              to={{
                                pathname: "/confirmShopBooking",
                                state: {
                                  shopBooking: shopBooking
                                }
                              }}
                            >
                              <button
                                className="btn btn-primary btn-sm"
                                // onClick={() => {
                                //   this.handleBooking(shopBooking._id);
                                // }}
                              >
                                Update
                              </button>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: "/shopPayments",
                                state: {
                                  shopBookingId: shopBooking._id,
                                  payments: shopBooking.payments
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

export default RenterAllShopsBookingsDetails;
