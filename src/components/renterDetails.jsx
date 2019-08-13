import React, { Component } from "react";
import { toast } from "react-toastify";
import { getRenterDetails } from "./services/allRegisterRenters";
class RenterDetails extends Component {
  state = {
    renter: {},
    totalVehiclesBookings: ""
  };
  async componentDidMount() {
    try {
      const { renterId } = this.props.location.state;
      const { data: renterDetails } = await getRenterDetails(renterId);
      const renter = renterDetails.renter;
      console.log("renter", renter);
      const totalVehiclesBookings = renterDetails.totalVehiclesBookings;

      this.setState({
        renter,
        totalVehiclesBookings
      });
      console.log(renterDetails);
    } catch (error) {
      toast.error(error + "");
    }
  }
  render() {
    const { renter, totalVehiclesBookings } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <center>
                {" "}
                <h3>Renter Details</h3>
              </center>
              <br />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <td>{renter.fullName}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{renter.email}</td>
                  </tr>
                  <tr>
                    <th>PhoneNo</th>
                    <td>{renter.phoneNo}</td>
                  </tr>
                  <tr>
                    <th>CnicNo</th>
                    <td>{renter.cnicNo}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{renter.address}</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>{renter.gender}</td>
                  </tr>
                  <tr>
                    <th>RegisteredDate</th>
                    <td>{renter.registeredDate}</td>
                  </tr>
                  <tr>
                    <th>VehiclesBookings</th>
                    <td>{totalVehiclesBookings}</td>
                  </tr>
                </thead>
              </table>
              <div />
            </div>
            <div className="col-md-4" style={{ marginTop: "65px" }}>
              <img
                src={renter.userImage}
                style={{ height: "300px", width: "300px" }}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RenterDetails;
