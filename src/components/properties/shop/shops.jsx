import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getShops } from "../../services/properties/shop/shopRequestService";
import authService from "../../services/authService";
class Shops extends Component {
  state = { shops: [] };
  async componentDidMount() {
    try {
      const { data: shops } = await getShops();
      if (shops) {
        this.setState({ shops });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { shops } = this.state;
    const user = authService.getCurrentUser();
    return (
      <React.Fragment>
        {shops.map(shop => (
          <div key={shop._id} style={{ display: "inline-block" }}>
            <img
              src={shop.shopImages[0]}
              style={{ margin: "10px" }}
              className="img-responsive"
              alt="Helpful alt text"
              width={300}
              height={250}
            />
            <h4 style={{ marginLeft: "12px" }}>
              {"Location "}
              {shop.location}
            </h4>
            <div style={{ marginLeft: "12px" }}>
              <Link
                to={{
                  pathname: "/shopDetails",
                  state: {
                    shopId: shop._id
                  }
                }}
              >
                <button
                  className="btn btn-outline-primary btn-sm"
                  style={{ margin: "2px" }}
                >
                  View Details
                </button>
              </Link>
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
                  className="btn btn-outline-primary btn-sm"
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
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Shops;
