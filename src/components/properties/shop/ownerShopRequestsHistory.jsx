import React, { Component } from "react";
import authService from "../../services/authService";
import { getOwnerShopRequests } from "../../services/properties/shop/shopRequestService";
class OwnerShopRequestsHistory extends Component {
  state = { shopRequests: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: shopRequests } = await getOwnerShopRequests(user._id);
      if (shopRequests) {
        this.setState({ shopRequests });
      }
    } catch (error) {}
  }
  render() {
    const { shopRequests } = this.state;
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
                  {shopRequests.map(shopRequest => (
                    <tr key={shopRequest._id}>
                      <td>{shopRequest.city}</td>
                      <td>{shopRequest.location}</td>
                      <td>{shopRequest.monthlyRent}</td>
                      <td>{shopRequest.memberShipDuration}</td>
                      <td>{shopRequest.status}</td>
                      <td>{shopRequest.requestDate}</td>
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

export default OwnerShopRequestsHistory;
