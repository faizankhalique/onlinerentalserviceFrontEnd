import React, { Component } from "react";
import {
  getShopRequests,
  deleteShopRequest
} from "../../services/properties/shop/shopRequestService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class ShopRequests extends Component {
  state = { shopRequests: [] };
  async componentDidMount() {
    const { data: shopRequests } = await getShopRequests();
    try {
      if (shopRequests) {
        this.setState({ shopRequests });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  handleDelete = async id => {
    const confirm = window.confirm("Do you want to Delete Request?");
    if (confirm) {
      const orignalShopRequests = this.state.shopRequests;
      const shopRequests = orignalShopRequests.filter(sr => sr._id !== id);
      this.setState({ shopRequests });
      try {
        const { data: response } = await deleteShopRequest(id);
        if (response) toast.success("shop Request Delete Successfuly");
      } catch (error) {
        if (error.response && error.response.status === 400)
          toast.error(`Error:400 ${error.response.data}`);
        else if (error.response && error.response.status === 404)
          toast.error(`This Request been deleted:404 (not found)`);
        else if (error.response && error.response.status === 401)
          toast.error(`Error:401 ${error.response.statusText}`);
        else if (error.response && error.response.status === 403)
          toast.error(`Error:403 ${error.response.statusText}`);
        else toast.error(`${error.response.data}`);
        this.setState({ shopRequests: orignalShopRequests });
      }
    }
  };
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
                    <th scope="col">RequesterName</th>
                    <th scope="col">Citiy</th>
                    <th scope="col">Location</th>
                    <th scope="col">Area</th>
                    <th scope="col">MonthlyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {shopRequests.map(
                    shopRequest =>
                      shopRequest.status == "Pending" && (
                        <tr key={shopRequest._id}>
                          <td>
                            <Link
                              to={{
                                pathname: "/productOwnerDetails",
                                state: {
                                  productOwnerId: shopRequest.requester._id
                                }
                              }}
                            >
                              {shopRequest.requester.fullName}
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: "/shopRequestDetails",
                                state: {
                                  shopRequest: shopRequest
                                }
                              }}
                            >
                              {shopRequest.city}
                            </Link>
                          </td>
                          <td>{shopRequest.location}</td>
                          <td>{shopRequest.area}</td>
                          <td>{shopRequest.monthlyRent}</td>
                          <td>{shopRequest.memberShipDuration}</td>
                          <td>{shopRequest.status}</td>
                          <td>{shopRequest.requestDate}</td>
                          <td>
                            <Link
                              to={{
                                pathname: "/updateShopRequest",
                                state: {
                                  shopRequest: shopRequest
                                }
                              }}
                            >
                              <button className="btn btn-primary btn-sm">
                                Update
                              </button>
                            </Link>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                this.handleDelete(shopRequest._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">Citiy</th>
                    <th scope="col">Location</th>
                    <th scope="col">Area</th>
                    <th scope="col">MonthlyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {shopRequests.map(
                    shopRequest =>
                      shopRequest.status == "Approved" && (
                        <tr key={shopRequest._id}>
                          <td>
                            <Link
                              to={{
                                pathname: "/productOwnerDetails",
                                state: {
                                  productOwnerId: shopRequest.requester._id
                                }
                              }}
                            >
                              {shopRequest.requester.fullName}
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: "/shopDetails",
                                state: {
                                  shopId: shopRequest._id,
                                  admin: true
                                }
                              }}
                            >
                              {shopRequest.city}
                            </Link>
                          </td>
                          <td>{shopRequest.location}</td>
                          <td>{shopRequest.area}</td>
                          <td>{shopRequest.monthlyRent}</td>
                          <td>{shopRequest.memberShipDuration}</td>
                          <td>{shopRequest.status}</td>
                          <td>{shopRequest.ApprovedDate}</td>
                          <td>
                            <button className="btn btn-primary btn-sm" disabled>
                              Update
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                this.handleDelete(shopRequest._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShopRequests;
