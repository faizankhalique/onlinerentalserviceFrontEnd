import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SearchBox from "./../../common/searchBox";
import { paginate } from "./../../../utils/paginate";
import Pagination from "./../../common/pagination";
import {
  getShopRentRequests,
  deleteShopRentRequest
} from "../../services/properties/shop/shopBookingService";
class ShopRentRequests extends Component {
  state = {
    shopRentRequests: [],
    pendingShopRentRequests: [],
    approvedShopRentRequests: [],
    pendingCurrentPage: 1,
    pendingPageSize: 4,
    pendingSearchQuery: "",
    approvedCurrentPage: 1,
    approvedPageSize: 4,
    approvedSearchQuery: ""
  };
  async componentDidMount() {
    try {
      const { data: shopRentRequests } = await getShopRentRequests();
      if (shopRentRequests) {
        let pendingShopRentRequests = shopRentRequests.filter(
          vr => vr.status == "Pending"
        );
        let approvedShopRentRequests = shopRentRequests.filter(
          vr => vr.status == "Approved"
        );
        this.setState({
          shopRentRequests,
          pendingShopRentRequests,
          approvedShopRentRequests
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
  filterPendingShopRentRequests = () => {
    const {
      pendingShopRentRequests,
      pendingPageSize,
      pendingCurrentPage,
      pendingSearchQuery
    } = this.state;
    let allRequests;
    let paginatePendingShopRentRequests = [];
    if (pendingSearchQuery) {
      allRequests = pendingShopRentRequests.filter(v =>
        v.renter.fullName
          .toLowerCase()
          .startsWith(pendingSearchQuery.toLowerCase())
      );
      paginatePendingShopRentRequests = paginate(
        allRequests,
        pendingCurrentPage,
        pendingPageSize
      );
      return paginatePendingShopRentRequests;
    }
    paginatePendingShopRentRequests = paginate(
      pendingShopRentRequests,
      pendingCurrentPage,
      pendingPageSize
    );
    return paginatePendingShopRentRequests;
  };
  filterApprovedShopRentRequests = () => {
    const {
      approvedShopRentRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allRequests;
    let paginateApprovedShopRentRequests = [];
    if (approvedSearchQuery) {
      allRequests = approvedShopRentRequests.filter(v =>
        v.renter.fullName
          .toLowerCase()
          .startsWith(approvedSearchQuery.toLowerCase())
      );
      paginateApprovedShopRentRequests = paginate(
        allRequests,
        approvedCurrentPage,
        approvedPageSize
      );
      return paginateApprovedShopRentRequests;
    }
    paginateApprovedShopRentRequests = paginate(
      approvedShopRentRequests,
      approvedCurrentPage,
      approvedPageSize
    );

    return paginateApprovedShopRentRequests;
  };
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
    const {
      pendingShopRentRequests,
      pendingCurrentPage,
      pendingPageSize,
      pendingSearchQuery,
      approvedShopRentRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allPendingShopRentRequests = this.filterPendingShopRentRequests();
    let allApprovedShopRentRequests = this.filterApprovedShopRentRequests();
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3>Pending Shop Rent Requests</h3>
              </center>
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox
                  value={pendingSearchQuery}
                  onChange={this.handlePendingSearch}
                />
              </div>
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
                  {allPendingShopRentRequests.map(shopRentRequest => (
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
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pendingPageSize}
                items={pendingShopRentRequests.length}
                currentPage={pendingCurrentPage}
                onPagechange={this.handlePendingPageChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3>Approved Shop Rent Requests</h3>
              </center>
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox
                  value={approvedSearchQuery}
                  onChange={this.handleApprovedSearch}
                />
              </div>
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
                  {allApprovedShopRentRequests.map(shopRentRequest => (
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
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={approvedPageSize}
                items={approvedShopRentRequests.length}
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

export default ShopRentRequests;
