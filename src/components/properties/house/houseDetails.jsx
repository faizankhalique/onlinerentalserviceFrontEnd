import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getHouse } from "../../services/properties/house/houseReuestService";
import authService from "../../services/authService";
class HouseDetails extends Component {
  state = {
    house: {},
    houseImage: "",
    admin: false,
    user: {},
    houseImages: []
  };
  async componentDidMount() {
    // // const { handle } = this.props.match.params;
    // const { house } = this.props.location.state;
    // if (house) {
    // }

    try {
      const { houseId, admin } = this.props.location.state;
      const user = authService.getCurrentUser();
      const { data: house } = await getHouse(houseId);
      if (house) {
        const houseImage = house.houseImages[0];
        this.setState({
          house,
          houseImage,
          admin,
          user: user,
          houseImages: house.houseImages
        });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  handleImage = image => {
    this.setState({ houseImage: image });
  };
  render() {
    const { house, houseImage, houseImages, admin, user } = this.state;
    return (
      <React.Fragment>
        {house && (
          <div
            className="container-fluid"
            style={{
              border: "1px solid black"
            }}
          >
            <div className="row">
              <div className="col-md-5">
                <center>
                  {" "}
                  <h3>House Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>City</th>
                      <td>{house.city}</td>
                    </tr>
                    <tr>
                      <th>Loction</th>
                      <td>{house.location}</td>
                    </tr>
                    <tr>
                      <th>Area</th>
                      <td>
                        {house.area} {" MARLA"}
                      </td>
                    </tr>
                    <tr>
                      <th>Portions</th>
                      <td>{house.portions}</td>
                    </tr>
                    <tr>
                      <th>BedRooms</th>
                      <td>{house.bedRooms}</td>
                    </tr>
                    <tr>
                      <th>Kitchens</th>
                      <td>{house.kitchens}</td>
                    </tr>
                    <tr>
                      <th>BathRooms</th>
                      <td>{house.baths}</td>
                    </tr>
                    <tr>
                      <th>Lawn</th>
                      <td>{house.lawn}</td>
                    </tr>
                    <tr>
                      <th>MonthlyRent</th>
                      <td>{house.monthlyRent}</td>
                    </tr>
                    {admin && (
                      <React.Fragment>
                        <tr>
                          <th>MemberShipDuration</th>
                          <td>{house.memberShipDuration}</td>
                        </tr>
                        <tr>
                          <th>Registred</th>
                          <td>{house.registered.toString()}</td>
                        </tr>
                        <tr>
                          <th>houseOnRent</th>
                          <td>{house.onRent.toString()}</td>
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
                          ? "/houseRentRequestForm"
                          : "/registerUser",
                      state: {
                        house: house
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
                  src={houseImage}
                  style={{ height: "400px", width: "600px" }}
                />
                <br />
                <br />
                {house &&
                  houseImages.map(image => (
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

export default HouseDetails;
