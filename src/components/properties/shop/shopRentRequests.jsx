import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getShopRentRequests,
  deleteShopRentRequest
} from "../../services/properties/shop/shopBookingService";
class ShopRentRequests extends Component {
  state = {
    shopRentRequests: []
  };
  async componentDidMount() {
    try {
      const { data: shopRentRequests } = await getShopRentRequests();
      if (shopRentRequests) {
        this.setState({ shopRentRequests });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  handleDelete = async id => {
    const confirm = window.confirm("Do you want to Delete Request?");
    if (confirm) {
      const orignalShopRentRequests = this.state.shopRentRequests;
      const shopRentRequests = orignalShopRentRequests.filter(
        hr => hr._id !== id
      );
      this.setState({ shopRentRequests });
      try {
        const { data: response } = await deleteShopRentRequest(id);
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
        this.setState({ shopRentRequests: orignalShopRentRequests });
      }
    }
  };
  render() {
    const { shopRentRequests } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">ShopLocation</th>
                    <th scope="col">ShopOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {shopRentRequests.map(
                    shopRentRequest =>
                      shopRentRequest.status == "Pending" && (
                        <tr key={shopRentRequest._id}>
                          <td>
                            <Link
                              to={{
                                pathname: "/renterDetails",
                                state: {
                                  renterId: shopRentRequest.renter._id
                                }
                              }}
                            >
                              {shopRentRequest.renter.fullName}
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: "/shopRentRequestDetails",
                                state: {
                                  shopRentRequest: shopRentRequest
                                }
                              }}
                            >
                              {shopRentRequest.shop.city}
                            </Link>
                          </td>
                          <td>{shopRentRequest.owner.fullName}</td>
                          <td>{shopRentRequest.startDate}</td>
                          <td>{shopRentRequest.endDate}</td>
                          <td>{shopRentRequest.status}</td>
                          <td>{shopRentRequest.requestDate}</td>

                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                this.handleDelete(shopRentRequest._id);
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
            <div className="col-sm-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">ShopLocation</th>
                    <th scope="col">ShopOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {shopRentRequests.map(
                    shopRentRequest =>
                      shopRentRequest.status == "Approved" && (
                        <tr key={shopRentRequest._id}>
                          <td>
                            <Link
                              to={{
                                pathname: "/renterDetails",
                                state: {
                                  renterId: shopRentRequest.renter._id
                                }
                              }}
                            >
                              {shopRentRequest.renter.fullName}
                            </Link>
                          </td>

                          <td>
                            <Link
                              to={{
                                pathname: "/shopDetails",
                                state: {
                                  shopId: shopRentRequest.shop._id,
                                  admin: true
                                }
                              }}
                            >
                              {shopRentRequest.shop.city}
                            </Link>
                          </td>
                          <td>{shopRentRequest.owner.fullName}</td>
                          <td>{shopRentRequest.startDate}</td>
                          <td>{shopRentRequest.endDate}</td>
                          <td>{shopRentRequest.status}</td>
                          <td>{shopRentRequest.ApprovedDate}</td>

                          <td>
                            <button className="btn btn-sm btn-danger">
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

export default ShopRentRequests;
