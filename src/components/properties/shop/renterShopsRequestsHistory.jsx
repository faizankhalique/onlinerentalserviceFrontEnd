import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getRenterShopRentRequests } from "../../services/properties/shop/shopBookingService";
import authService from "../../services/authService";
class RenterShopRequestsHistory extends Component {
  state = {
    shopRentRequests: []
  };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: shopRentRequests } = await getRenterShopRentRequests(
        user._id
      );
      if (shopRentRequests) {
        this.setState({ shopRentRequests });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  render() {
    const { shopRentRequests } = this.state;
    let length = shopRentRequests.length;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ShopLocation</th>
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
                  {length > 0 &&
                    shopRentRequests.map(shopRentRequest => (
                      <tr key={shopRentRequest._id}>
                        <td>{shopRentRequest.shop.city}</td>
                        <td>{shopRentRequest.startDate}</td>
                        <td>{shopRentRequest.endDate}</td>
                        <td>{shopRentRequest.status}</td>
                        <td>{shopRentRequest.requestDate}</td>
                        <td>{shopRentRequest.requestTime}</td>
                        <td>{shopRentRequest.ApprovedDate}</td>
                        <td>{shopRentRequest.ApprovedTime}</td>
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

export default RenterShopRequestsHistory;
