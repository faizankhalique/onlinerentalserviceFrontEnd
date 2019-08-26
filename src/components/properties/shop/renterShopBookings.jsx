import React, { Component } from "react";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { getRenterShopBookings } from "../../services/properties/shop/shopBookingService";
import { Link } from "react-router-dom";
class RenterShopsBookings extends Component {
  state = { shopBookings: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: shopBookings } = await getRenterShopBookings(user._id);
      if (shopBookings.length > 0) this.setState({ shopBookings });
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { shopBookings } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ShopLocation</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">TotalMonths</th>
                    <th scope="col">Security</th>
                    <th scope="col">BookingStatus</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {shopBookings &&
                    shopBookings.map(
                      shopBooking =>
                        shopBooking.bookingStatus !== "Pending" && (
                          <tr key={shopBooking._id}>
                            <td>
                              {shopBooking.shop.city}
                              {"_"}
                              {shopBooking.shop.location}
                            </td>
                            <td>{shopBooking.startDate}</td>
                            <td>{shopBooking.endDate}</td>
                            <td>{shopBooking.totalMonths}</td>
                            <td>{shopBooking.security}</td>
                            <td>{shopBooking.bookingStatus}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterShopPaymentHistory",
                                  state: {
                                    payments: shopBooking.payments,
                                    shopBookingId: shopBooking._id
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

export default RenterShopsBookings;
