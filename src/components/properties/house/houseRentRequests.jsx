import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { paginate } from "./../../../utils/paginate";
import SearchBox from "./../../common/searchBox";
import Pagination from "./../../common/pagination";
import {
  getHouseRentRequests,
  deleteHouseRentRequest
} from "../../services/properties/house/houseBookingService";
class HouseRentRequests extends Component {
  state = {
    houseRentRequests: [],
    pendingHouseRentRequests: [],
    approvedHouseRentRequests: [],
    pendingHouseRentRequestsLength: "",
    approvedHouseRentRequestsLength: "",
    pendingCurrentPage: 1,
    pendingPageSize: 4,
    pendingSearchQuery: "",
    approvedCurrentPage: 1,
    approvedPageSize: 4,
    approvedSearchQuery: ""
  };
  async componentDidMount() {
    try {
      const { data: houseRentRequests } = await getHouseRentRequests();
      if (houseRentRequests) {
        let pendingHouseRentRequests = houseRentRequests.filter(
          vr => vr.status == "Pending"
        );
        let approvedHouseRentRequests = houseRentRequests.filter(
          vr => vr.status == "Approved"
        );
        let pendingHouseRentRequestsLength = pendingHouseRentRequests.length;
        let approvedHouseRentRequestsLength = approvedHouseRentRequests.length;
        this.setState({
          houseRentRequests,
          pendingHouseRentRequests,
          approvedHouseRentRequests,
          pendingHouseRentRequestsLength,
          approvedHouseRentRequestsLength
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
  filterPendingHouseRentRequests = () => {
    const {
      pendingHouseRentRequests,
      pendingPageSize,
      pendingCurrentPage,
      pendingSearchQuery
    } = this.state;
    let allRequests;
    let paginatePendingHouseRentRequests = [];
    if (pendingSearchQuery) {
      allRequests = pendingHouseRentRequests.filter(v =>
        v.renter.fullName
          .toLowerCase()
          .startsWith(pendingSearchQuery.toLowerCase())
      );
      paginatePendingHouseRentRequests = paginate(
        allRequests,
        pendingCurrentPage,
        pendingPageSize
      );
      return paginatePendingHouseRentRequests;
    }
    paginatePendingHouseRentRequests = paginate(
      pendingHouseRentRequests,
      pendingCurrentPage,
      pendingPageSize
    );
    return paginatePendingHouseRentRequests;
  };
  filterApprovedHouseRentRequests = () => {
    const {
      approvedHouseRentRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allRequests;
    let paginateApprovedHouseRentRequests = [];
    if (approvedSearchQuery) {
      allRequests = approvedHouseRentRequests.filter(v =>
        v.renter.fullName
          .toLowerCase()
          .startsWith(approvedSearchQuery.toLowerCase())
      );
      paginateApprovedHouseRentRequests = paginate(
        allRequests,
        approvedCurrentPage,
        approvedPageSize
      );
      return paginateApprovedHouseRentRequests;
    }
    paginateApprovedHouseRentRequests = paginate(
      approvedHouseRentRequests,
      approvedCurrentPage,
      approvedPageSize
    );

    return paginateApprovedHouseRentRequests;
  };
  handleDelete = async id => {
    const confirm = window.confirm("Do you want to Delete Request?");
    if (confirm) {
      const orignalHouseRentRequests = this.state.pendingHouseRentRequests;
      const pendingHouseRentRequests = orignalHouseRentRequests.filter(
        hr => hr._id !== id
      );
      this.setState({ pendingHouseRentRequests });
      try {
        const { data: response } = await deleteHouseRentRequest(id);
        if (response) toast.success("House Request Delete Successfuly");
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
        this.setState({ pendingHouseRentRequests: orignalHouseRentRequests });
      }
    }
  };
  render() {
    const {
      pendingHouseRentRequests,
      pendingCurrentPage,
      pendingPageSize,
      pendingSearchQuery,
      approvedHouseRentRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery,
      pendingHouseRentRequestsLength,
      approvedHouseRentRequestsLength
    } = this.state;
    let allPendingHouseRentRequests = this.filterPendingHouseRentRequests();
    let allApprovedHouseRentRequests = this.filterApprovedHouseRentRequests();
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3>Pending House Rent Requests</h3>
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
                    <th scope="col">HouseLocation</th>
                    <th scope="col">HouseOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allPendingHouseRentRequests.map(houseRentRequest => (
                    <tr key={houseRentRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterDetails",
                            state: {
                              renterId: houseRentRequest.renter._id
                            }
                          }}
                        >
                          {houseRentRequest.renter.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/houseRentRequestDetails",
                            state: {
                              houseRentRequest: houseRentRequest
                            }
                          }}
                        >
                          {houseRentRequest.house.city}
                        </Link>
                      </td>
                      <td>{houseRentRequest.owner.fullName}</td>
                      <td>{houseRentRequest.startDate}</td>
                      <td>{houseRentRequest.endDate}</td>
                      <td>{houseRentRequest.status}</td>
                      <td>{houseRentRequest.requestDate}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            this.handleDelete(houseRentRequest._id);
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
                items={pendingHouseRentRequests.length}
                currentPage={pendingCurrentPage}
                onPagechange={this.handlePendingPageChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3>Approved House Rent Requests</h3>
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
                    <th scope="col">HouseLocation</th>
                    <th scope="col">HouseOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                  </tr>
                </thead>
                <tbody>
                  {allApprovedHouseRentRequests.map(houseRentRequest => (
                    <tr key={houseRentRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterDetails",
                            state: {
                              renterId: houseRentRequest.renter._id
                            }
                          }}
                        >
                          {houseRentRequest.renter.fullName}
                        </Link>
                      </td>

                      <td>
                        <Link
                          to={{
                            pathname: "/houseDetails",
                            state: {
                              houseId: houseRentRequest.house._id,
                              admin: true
                            }
                          }}
                        >
                          {houseRentRequest.house.city}
                        </Link>
                      </td>
                      <td>{houseRentRequest.owner.fullName}</td>
                      <td>{houseRentRequest.startDate}</td>
                      <td>{houseRentRequest.endDate}</td>
                      <td>{houseRentRequest.status}</td>
                      <td>{houseRentRequest.ApprovedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={approvedPageSize}
                items={approvedHouseRentRequests.length}
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

export default HouseRentRequests;
