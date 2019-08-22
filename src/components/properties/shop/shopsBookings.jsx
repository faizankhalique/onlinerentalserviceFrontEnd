import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getShopRentRequests } from "../../services/properties/shop/shopBookingService";
class ShopBookings extends Component {
  state = { shopBookings: [] };
  async componentDidMount() {
    try {
      const { data: shopBookings } = await getShopRentRequests();
      if (shopBookings) this.setState({ shopBookings });
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
    const { shopBookings } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">ShopLocation</th>
                    <th scope="col">ShopOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Confirmation</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {shopBookings &&
                    shopBookings.map(
                      shopBooking =>
                        shopBooking.bookingConfirmation == "Pending" &&
                        shopBooking.status == "Approved" && (
                          <tr key={shopBooking._id}>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterDetails",
                                  state: {
                                    renterId: shopBooking.renter._id
                                  }
                                }}
                              >
                                {shopBooking.renter.fullName}
                              </Link>
                            </td>
                            <td>{shopBooking.shop.city}</td>
                            <td>{shopBooking.owner.fullName}</td>
                            <td>{shopBooking.startDate}</td>
                            <td>{shopBooking.endDate}</td>
                            <td>{shopBooking.bookingConfirmation}</td>
                            <td>
                              <Link
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
                                  Confirm
                                </button>
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  this.handleDelete(shopBooking._id);
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
                    <th scope="col">ShopLocation</th>
                    <th scope="col">ShopOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Confirmation</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {shopBookings &&
                    shopBookings.map(
                      shopBooking =>
                        shopBooking.bookingConfirmation == "Confirm" &&
                        shopBooking.status == "Approved" && (
                          <tr key={shopBooking._id}>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterDetails",
                                  state: {
                                    renterId: shopBooking.renter._id
                                  }
                                }}
                              >
                                {shopBooking.renter.fullName}
                              </Link>
                            </td>
                            <td>{shopBooking.shop.city}</td>
                            <td>{shopBooking.owner.fullName}</td>
                            <td>{shopBooking.startDate}</td>
                            <td>{shopBooking.endDate}</td>
                            <td>{shopBooking.bookingConfirmation}</td>
                            <td>
                              <Link
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
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  this.handleDelete(shopBooking._id);
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

export default ShopBookings;
