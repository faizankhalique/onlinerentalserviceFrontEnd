import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getRenterHouseBooking } from "../../services/properties/house/houseBookingService";
class HouseBookingDetails extends Component {
  state = {
    houseBooking: {},
    houseImage: "",
    houseImages: [],
    house: {}
  };
  async componentDidMount() {
    const { houseBookingId } = this.props.location.state;
    const { data: houseBooking } = await getRenterHouseBooking(houseBookingId);
    if (houseBooking) {
      let house = houseBooking.house;
      let houseImage = houseBooking.house.houseImages[0];
      let houseImages = houseBooking.house.houseImages;
      this.setState({ houseBooking, houseImage, houseImages, house });
      console.log("houseBooking", houseBooking);
    }
  }
  handleImage = image => {
    this.setState({ houseImage: image });
  };
  render() {
    const { houseBooking, houseImage, houseImages, house } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          {houseBooking && (
            <div className="row" style={{ padding: "4px" }}>
              <div className="col-md-6">
                <center>
                  {" "}
                  <h3>house Booking Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>House Loctaion</th>
                      <td>
                        <Link
                          to={{
                            pathname: "/houseDetails",
                            state: {
                              houseId: house._id,
                              admin: true
                            }
                          }}
                        >
                          {house.location}
                        </Link>
                      </td>
                    </tr>

                    <tr>
                      <th>StartDate</th>
                      <td> {houseBooking.startDate}</td>
                    </tr>
                    <tr>
                      <th>EndDate</th>
                      <td> {houseBooking.endDate}</td>
                    </tr>

                    <tr>
                      <th>BookingConfirmation</th>
                      <td>{houseBooking.bookingConfirmation}</td>
                    </tr>
                    <tr>
                      <th>Request-Status</th>
                      <td>{houseBooking.status}</td>
                    </tr>
                    <tr>
                      <th>RequestDate</th>
                      <td>{houseBooking.requestDate}</td>
                    </tr>
                    <tr>
                      <th>RequestTime</th>
                      <td>{houseBooking.requestTime}</td>
                    </tr>
                  </thead>
                </table>
                <div />
              </div>
              <div className="col-md-4" style={{ marginTop: "65px" }}>
                <img
                  src={houseImage}
                  style={{ height: "400px", width: "500px" }}
                />
                <br />
                <br />
                {houseBooking &&
                  houseImages.map(image => (
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

export default HouseBookingDetails;
