import React, { Component } from "react";
import authService from "../../services/authService";
import { getOwnerHouseRequests } from "../../services/properties/house/houseReuestService";
class OwnerHouseRequestsHistory extends Component {
  state = { houseRequests: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: houseRequests } = await getOwnerHouseRequests(user._id);
      if (houseRequests) {
        this.setState({ houseRequests });
        console.log("houseRequests", houseRequests);
      }
    } catch (error) {}
  }
  render() {
    const { houseRequests } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">City</th>
                    <th scope="col">Location</th>
                    <th scope="col">MonthlyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                  </tr>
                </thead>
                <tbody>
                  {houseRequests.map(houseRequest => (
                    <tr key={houseRequest._id}>
                      <td>{houseRequest.city}</td>
                      <td>{houseRequest.location}</td>
                      <td>{houseRequest.monthlyRent}</td>
                      <td>{houseRequest.memberShipDuration}</td>
                      <td>{houseRequest.status}</td>
                      <td>{houseRequest.requestDate}</td>
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

export default OwnerHouseRequestsHistory;
