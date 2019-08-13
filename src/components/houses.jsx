import React, { Component } from "react";
import { getHouses } from "./services/properties/house/houseReuestService";
import authService from "./services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class House extends Component {
  state = { houses: [] };
  async componentDidMount() {
    try {
      const { data: houses } = await getHouses();
      if (houses) {
        this.setState({ houses });
        console.log("houses", houses);
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { houses } = this.state;
    const user = authService.getCurrentUser();
    return (
      <React.Fragment>
        {houses.map(house => (
          <div key={house._id} style={{ display: "inline-block" }}>
            <img
              src={house.houseImages[0]}
              style={{ margin: "10px" }}
              className="img-responsive rounded"
              alt="Helpful alt text"
              width={300}
              height={250}
            />
            <h4 style={{ marginLeft: "12px" }}>
              {/* <i class="fa fa-star-o" aria-hidden="true" />
              <i class="fa fa-star-o" aria-hidden="true" />
              <i class="fa fa-star-o" aria-hidden="true" />
              <i class="fa fa-star-o" aria-hidden="true" />
              <br /> */}
              {"Location "}
              {house.location}
            </h4>
            <div style={{ marginLeft: "12px" }}>
              <Link
                to={{
                  pathname: "/houseDetails",
                  state: {
                    houseId: house._id
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
                      ? "/houseRentRequestForm"
                      : "/registerUser",
                  state: {
                    house: house
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

export default House;
