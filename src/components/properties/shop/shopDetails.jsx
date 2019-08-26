import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getShop } from "../../services/properties/shop/shopRequestService";
import authService from "../../services/authService";
class ShopDetails extends Component {
  state = {
    shop: {},
    shopImage: "",
    admin: false,
    user: {},
    shopImages: []
  };
  async componentDidMount() {
    try {
      const { shopId, admin } = this.props.location.state;
      const user = authService.getCurrentUser();
      const { data: shop } = await getShop(shopId);
      if (shop) {
        const shopImage = shop.shopImages[0];
        this.setState({
          shop,
          shopImage,
          admin,
          user: user,
          shopImages: shop.shopImages
        });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  handleImage = image => {
    this.setState({ shopImage: image });
  };
  render() {
    const { shop, shopImage, shopImages, admin, user } = this.state;
    return (
      <React.Fragment>
        {shop && (
          <div className="container-fluid" style={{ marginTop: "25px" }}>
            <div className="row">
              <div className="col-md-5">
                <center>
                  {" "}
                  <h3>Shop Details</h3>
                </center>
                <br />
                <table
                  className="table table-bordered"
                  style={{ backgroundColor: "white" }}
                >
                  <thead>
                    <tr>
                      <th>City</th>
                      <td>{shop.city}</td>
                    </tr>
                    <tr>
                      <th>Loction</th>
                      <td>{shop.location}</td>
                    </tr>
                    <tr>
                      <th>Area</th>
                      <td>
                        {shop.area} {" MARLA"}
                      </td>
                    </tr>
                    <tr>
                      <th>MonthlyRent</th>
                      <td>{shop.monthlyRent}</td>
                    </tr>
                    {admin && (
                      <React.Fragment>
                        <tr>
                          <th>MemberShipDuration</th>
                          <td>{shop.memberShipDuration}</td>
                        </tr>
                        <tr>
                          <th>Registred</th>
                          <td>{shop.registered.toString()}</td>
                        </tr>
                        <tr>
                          <th>shopOnRent</th>
                          <td>{shop.onRent.toString()}</td>
                        </tr>
                      </React.Fragment>
                    )}
                  </thead>
                </table>
                {admin || (
                  <Link
                    to={{
                      pathname:
                        user && user.accountType === "renter"
                          ? "/shopRentRequestForm"
                          : "/registerUser",
                      state: {
                        shop: shop
                      }
                    }}
                  >
                    {" "}
                    <button
                      className="btn btn-primary btn-sm btn-block"
                      style={{ margin: "2px" }}
                      disabled={
                        (user && user.accountType === "admin") ||
                        (user && user.accountType === "productowner")
                          ? true
                          : false
                      }
                    >
                      Book Now
                    </button>
                  </Link>
                )}
              </div>
              <div
                className="col-md-6"
                style={{ marginTop: "65px", marginLeft: "60px" }}
              >
                <img
                  src={shopImage}
                  style={{ height: "400px", width: "600px" }}
                />
                <br />
                <br />
                {shop &&
                  shopImages.map(image => (
                    <img
                      src={image}
                      style={{ height: "50px", width: "50px", margin: "8px" }}
                      onClick={() => {
                        this.handleImage(image);
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ShopDetails;
