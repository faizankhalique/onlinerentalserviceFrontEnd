import React, { Component } from "react";
import {
  getShopRequests,
  deleteShopRequest
} from "../../services/properties/shop/shopRequestService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { paginate } from "./../../../utils/paginate";
import SearchBox from "./../../common/searchBox";
import Pagination from "./../../common/pagination";
class ShopRequests extends Component {
  state = {
    shopRequests: [],
    pendingShopRequests: [],
    approvedShopRequests: [],
    pendingCurrentPage: 1,
    pendingPageSize: 4,
    pendingSearchQuery: "",
    approvedCurrentPage: 1,
    approvedPageSize: 4,
    approvedSearchQuery: ""
  };
  async componentDidMount() {
    const { data: shopRequests } = await getShopRequests();
    try {
      if (shopRequests) {
        let pendingShopRequests = shopRequests.filter(
          vr => vr.status == "Pending"
        );
        let approvedShopRequests = shopRequests.filter(
          vr => vr.status == "Approved"
        );
        this.setState({
          shopRequests,
          pendingShopRequests,
          approvedShopRequests
        });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  handlePendingPageChange = page => {
    this.setState({ pendingCurrentPage: page });
  };
  handleApprovedPageChange = page => {
    this.setState({ approvedCurrentPage: page });
  };
  handlePendingSearch = query => {
    this.setState({ pendingSearchQuery: query, pendingCurrentPage: 1 });
  };
  handleApprovedSearch = query => {
    this.setState({ approvedSearchQuery: query, approvedCurrentPage: 1 });
  };
  filterPendingShopRequests = () => {
    const {
      pendingShopRequests,
      pendingPageSize,
      pendingCurrentPage,
      pendingSearchQuery
    } = this.state;
    let allRequests;
    let paginatePendingShopRequests = [];
    if (pendingSearchQuery) {
      allRequests = pendingShopRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(pendingSearchQuery.toLowerCase())
      );
      paginatePendingShopRequests = paginate(
        allRequests,
        pendingCurrentPage,
        pendingPageSize
      );
      return paginatePendingShopRequests;
    }
    paginatePendingShopRequests = paginate(
      pendingShopRequests,
      pendingCurrentPage,
      pendingPageSize
    );
    return paginatePendingShopRequests;
  };
  filterApprovedShopRequests = () => {
    const {
      approvedShopRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allRequests;
    let paginateApprovedShopRequests = [];
    if (approvedSearchQuery) {
      allRequests = approvedShopRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(approvedSearchQuery.toLowerCase())
      );
      paginateApprovedShopRequests = paginate(
        allRequests,
        approvedCurrentPage,
        approvedPageSize
      );
      return paginateApprovedShopRequests;
    }
    paginateApprovedShopRequests = paginate(
      approvedShopRequests,
      approvedCurrentPage,
      approvedPageSize
    );

    return paginateApprovedShopRequests;
  };
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
    const {
      pendingShopRequests,
      pendingCurrentPage,
      pendingPageSize,
      pendingSearchQuery,
      approvedShopRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allPendingShopRequests = this.filterPendingShopRequests();
    let allApprovedShopRequests = this.filterApprovedShopRequests();
    return (
      <React.Fragment>
        <div className="container">
          <div className="row" style={{ marginTop: "8px" }}>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  {/* <h4 className="card-title">
                    <Link to="#">Vehicles</Link>
                  </h4> */}
                  <p className="card-text">
                    <h5 style={{ fontFamily: "Book Antiqua" }}>
                      Pending Requests: {pendingShopRequests.length}
                    </h5>

                    <h5
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Approved Requests: {approvedShopRequests.length}
                    </h5>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <center>
                <h3>Pending Shop Requests</h3>
              </center>
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox
                  value={pendingSearchQuery}
                  onChange={this.handlePendingSearch}
                />
              </div>
              <table className="table" style={{ backgroundColor: "white" }}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">City</th>
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
                  {allPendingShopRequests.map(shopRequest => (
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
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pendingPageSize}
                items={pendingShopRequests.length}
                currentPage={pendingCurrentPage}
                onPagechange={this.handlePendingPageChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <center>
                <h3>Approved Shop Requests</h3>
              </center>
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox
                  value={approvedSearchQuery}
                  onChange={this.handleApprovedSearch}
                />
              </div>
              <table className="table" style={{ backgroundColor: "white" }}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">City</th>
                    <th scope="col">Location</th>
                    <th scope="col">Area</th>
                    <th scope="col">MonthlyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                  </tr>
                </thead>
                <tbody>
                  {allApprovedShopRequests.map(
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
                        </tr>
                      )
                  )}
                </tbody>
              </table>
              <Pagination
                pageSize={approvedPageSize}
                items={approvedShopRequests.length}
                currentPage={approvedCurrentPage}
                onPagechange={this.handleApprovedPageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShopRequests;
