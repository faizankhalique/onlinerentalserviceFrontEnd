import React, { Component } from "react";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { getRenterShopBookings } from "../../services/properties/shop/shopBookingService";
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
                    <th scope="col">HouseLocation</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Confirmation</th>
                  </tr>
                </thead>
                <tbody>
                  {shopBookings &&
                    shopBookings.map(shopBooking => (
                      <tr key={shopBooking._id}>
                        <td>
                          {shopBooking.shop.city}
                          {"_"}
                          {shopBooking.shop.location}
                        </td>
                        <td>{shopBooking.startDate}</td>

                        <td>{shopBooking.rent}</td>
                        <td>{shopBooking.bookingConfirmation}</td>
                      </tr>
                    ))}
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
