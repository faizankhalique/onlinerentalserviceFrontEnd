import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getRenterHouseRentRequests } from "../../services/properties/house/houseBookingService";
import authService from "../../services/authService";
class RenterHouseRequestsHistory extends Component {
  state = {
    houseRentRequests: []
  };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: houseRentRequests } = await getRenterHouseRentRequests(
        user._id
      );
      if (houseRentRequests) {
        this.setState({ houseRentRequests });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  render() {
    const { houseRentRequests } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">HouseLocation</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th scope="col">RequestTime</th>
                    <th scope="col">ApprovedDate</th>
                    <th scope="col">ApprovedTime</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {houseRentRequests.map(houseRentRequest => (
                    <tr key={houseRentRequest._id}>
                      <td>{houseRentRequest.house.city}</td>
                      <td>{houseRentRequest.startDate}</td>
                      <td>{houseRentRequest.endDate}</td>
                      <td>{houseRentRequest.status}</td>
                      <td>{houseRentRequest.requestDate}</td>
                      <td>{houseRentRequest.requestTime}</td>
                      <td>{houseRentRequest.ApprovedDate}</td>
                      <td>{houseRentRequest.ApprovedTime}</td>
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

export default RenterHouseRequestsHistory;
