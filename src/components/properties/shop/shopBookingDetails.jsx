import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getRenterShopBooking } from "../../services/properties/shop/shopBookingService";
class ShopBookingDetails extends Component {
  state = {
    shopBooking: {},
    shopImage: "",
    shopImages: [],
    shop: {}
  };
  async componentDidMount() {
    const { shopBookingId } = this.props.location.state;
    const { data: shopBooking } = await getRenterShopBooking(shopBookingId);
    if (shopBooking) {
      let shop = shopBooking.shop;
      let shopImage = shopBooking.shop.shopImages[0];
      let shopImages = shopBooking.shop.shopImages;
      this.setState({ shopBooking, shopImage, shopImages, shop });
    }
  }
  handleImage = image => {
    this.setState({ shopImage: image });
  };
  render() {
    const { shopBooking, shopImage, shopImages, shop } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          {shopBooking && (
            <div className="row" style={{ padding: "4px" }}>
              <div className="col-md-6">
                <center>
                  {" "}
                  <h3>shop Booking Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Shop Location</th>
                      <td>
                        <Link
                          to={{
                            pathname: "/shopDetails",
                            state: {
                              shopId: shop._id,
                              admin: true
                            }
                          }}
                        >
                          {shop.location}
                        </Link>
                      </td>
                    </tr>

                    <tr>
                      <th>StartDate</th>
                      <td> {shopBooking.startDate}</td>
                    </tr>
                    <tr>
                      <th>EndDate</th>
                      <td> {shopBooking.endDate}</td>
                    </tr>

                    <tr>
                      <th>BookingConfirmation</th>
                      <td>{shopBooking.bookingConfirmation}</td>
                    </tr>
                    <tr>
                      <th>Request-Status</th>
                      <td>{shopBooking.status}</td>
                    </tr>
                    <tr>
                      <th>RequestDate</th>
                      <td>{shopBooking.requestDate}</td>
                    </tr>
                    <tr>
                      <th>RequestTime</th>
                      <td>{shopBooking.requestTime}</td>
                    </tr>
                  </thead>
                </table>
                <div />
              </div>
              <div className="col-md-4" style={{ marginTop: "65px" }}>
                <img
                  src={shopImage}
                  style={{ height: "400px", width: "500px" }}
                />
                <br />
                <br />
                {shopBooking &&
                  shopImages.map(image => (
                    <img
                      key={image}
                      src={image}
                      style={{ height: "50px", width: "50px", margin: "8px" }}
                      onClick={() => {
                        this.handleImage(image);
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ShopBookingDetails;
