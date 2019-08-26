import React, { Component } from "react";
import {
  getHouseRequests,
  deleteHouseRequest
} from "../../services/properties/house/houseReuestService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SearchBox from "./../../common/searchBox";
import { paginate } from "./../../../utils/paginate";
import Pagination from "./../../common/pagination";
class HouseRequests extends Component {
  state = {
    houseRequests: [],
    pendingHouseRequests: [],
    approvedHouseRequests: [],
    pendingHouseRequestsLength: "",
    approvedHouseRequestsLength: "",
    pendingCurrentPage: 1,
    pendingPageSize: 4,
    pendingSearchQuery: "",
    approvedCurrentPage: 1,
    approvedPageSize: 4,
    approvedSearchQuery: ""
  };
  async componentDidMount() {
    const { data: houseRequests } = await getHouseRequests();
    try {
      if (houseRequests) {
        let pendingHouseRequests = houseRequests.filter(
          vr => vr.status == "Pending"
        );
        let approvedHouseRequests = houseRequests.filter(
          vr => vr.status == "Approved"
        );
        let pendingHouseRequestsLength = pendingHouseRequests.length;
        let approvedHouseRequestsLength = approvedHouseRequests.length;
        this.setState({
          houseRequests,
          pendingHouseRequests,
          approvedHouseRequests,
          pendingHouseRequestsLength,
          approvedHouseRequestsLength
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
  filterPendingHouseRequests = () => {
    const {
      pendingHouseRequests,
      pendingPageSize,
      pendingCurrentPage,
      pendingSearchQuery
    } = this.state;
    let allRequests;
    let paginatePendingHouseRequests = [];
    if (pendingSearchQuery) {
      allRequests = pendingHouseRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(pendingSearchQuery.toLowerCase())
      );
      paginatePendingHouseRequests = paginate(
        allRequests,
        pendingCurrentPage,
        pendingPageSize
      );
      return paginatePendingHouseRequests;
    }
    paginatePendingHouseRequests = paginate(
      pendingHouseRequests,
      pendingCurrentPage,
      pendingPageSize
    );
    return paginatePendingHouseRequests;
  };
  filterApprovedHouseRequests = () => {
    const {
      approvedHouseRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allRequests;
    let paginateApprovedHouseRequests = [];
    if (approvedSearchQuery) {
      allRequests = approvedHouseRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(approvedSearchQuery.toLowerCase())
      );
      paginateApprovedHouseRequests = paginate(
        allRequests,
        approvedCurrentPage,
        approvedPageSize
      );
      return paginateApprovedHouseRequests;
    }
    paginateApprovedHouseRequests = paginate(
      approvedHouseRequests,
      approvedCurrentPage,
      approvedPageSize
    );

    return paginateApprovedHouseRequests;
  };
  handleDelete = async id => {
    const confirm = window.confirm("Do you want to Delete Request?");
    if (confirm) {
      const orignalHouseRequests = this.state.pendingHouseRequests;
      const pendingHouseRequests = orignalHouseRequests.filter(
        hr => hr._id !== id
      );
      this.setState({ pendingHouseRequests });
      try {
        const { data: response } = await deleteHouseRequest(id);
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
        this.setState({ pendingHouseRequests: orignalHouseRequests });
      }
    }
  };
  render() {
    const {
      houseRequests,
      pendingHouseRequests,
      pendingCurrentPage,
      pendingPageSize,
      pendingSearchQuery,
      approvedHouseRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery,
      pendingHouseRequestsLength,
      approvedHouseRequestsLength
    } = this.state;
    let allPendingHouseRequests = this.filterPendingHouseRequests();
    let allApprovedHouseRequests = this.filterApprovedHouseRequests();
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
                      Pending Requests: {pendingHouseRequestsLength}
                    </h5>

                    <h5
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Approved Requests: {approvedHouseRequestsLength}
                    </h5>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <center>
                <h3>Pending House Requests</h3>
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
                  {allPendingHouseRequests.map(houseRequest => (
                    <tr key={houseRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/productOwnerDetails",
                            state: {
                              productOwnerId: houseRequest.requester._id
                            }
                          }}
                        >
                          {houseRequest.requester.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/houseRequestDetails",
                            state: {
                              houseRequest: houseRequest
                            }
                          }}
                        >
                          {houseRequest.city}
                        </Link>
                      </td>
                      <td>{houseRequest.location}</td>
                      <td>{houseRequest.area}</td>
                      <td>{houseRequest.monthlyRent}</td>
                      <td>{houseRequest.memberShipDuration}</td>
                      <td>{houseRequest.status}</td>
                      <td>{houseRequest.requestDate}</td>
                      <td>
                        <Link
                          to={{
                            pathname: "/updateHouseRequest",
                            state: {
                              houseRequest: houseRequest
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
                            this.handleDelete(houseRequest._id);
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
                items={pendingHouseRequests.length}
                currentPage={pendingCurrentPage}
                onPagechange={this.handlePendingPageChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <center>
                <h3>Approved House Requests</h3>
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
                  {allApprovedHouseRequests.map(houseRequest => (
                    <tr key={houseRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/productOwnerDetails",
                            state: {
                              productOwnerId: houseRequest.requester._id
                            }
                          }}
                        >
                          {houseRequest.requester.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/houseDetails",
                            state: {
                              houseId: houseRequest._id,
                              admin: true
                            }
                          }}
                        >
                          {houseRequest.city}
                        </Link>
                      </td>
                      <td>{houseRequest.location}</td>
                      <td>{houseRequest.area}</td>
                      <td>{houseRequest.monthlyRent}</td>
                      <td>{houseRequest.memberShipDuration}</td>
                      <td>{houseRequest.status}</td>
                      <td>{houseRequest.ApprovedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={approvedPageSize}
                items={approvedHouseRequests.length}
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

export default HouseRequests;
