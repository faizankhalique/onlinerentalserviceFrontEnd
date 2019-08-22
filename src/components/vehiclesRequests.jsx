import React, { Component } from "react";
import { getVehiclesRequests } from "./services/vehicleRequestService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import SearchBox from "./common/searchBox";
class VehicleRequests extends Component {
  state = {
    vehicleRequests: [],
    pendingVehicleRequests: [],
    approvedVehicleRequests: [],
    pendingCurrentPage: 1,
    pendingPageSize: 4,
    pendingSearchQuery: "",
    approvedCurrentPage: 1,
    approvedPageSize: 4,
    approvedSearchQuery: "",
    pendingRequestsLength: "",
    approvedRequestsLength: ""
  };
  async componentDidMount() {
    try {
      const reponse = await getVehiclesRequests();
      if (reponse) {
        const { data: vehicleRequests } = reponse;
        let pendingVehicleRequests = vehicleRequests.filter(
          vr => vr.status == "Pending"
        );
        let approvedVehicleRequests = vehicleRequests.filter(
          vr => vr.status == "Approved"
        );
        let pendingRequestsLength = pendingVehicleRequests.length;
        let approvedRequestsLength = approvedVehicleRequests.length;
        this.setState({
          vehicleRequests,
          pendingVehicleRequests,
          approvedVehicleRequests,
          pendingRequestsLength,
          approvedRequestsLength
        });
      }
    } catch (error) {
      toast.error("" + error);
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
  filterPendingVehicleRequests = () => {
    const {
      pendingVehicleRequests,
      pendingPageSize,
      pendingCurrentPage,
      pendingSearchQuery
    } = this.state;
    let allRequests;
    let paginatePendingVehicleRequests = [];
    if (pendingSearchQuery) {
      allRequests = pendingVehicleRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(pendingSearchQuery.toLowerCase())
      );
      paginatePendingVehicleRequests = paginate(
        allRequests,
        pendingCurrentPage,
        pendingPageSize
      );
      return paginatePendingVehicleRequests;
    }
    paginatePendingVehicleRequests = paginate(
      pendingVehicleRequests,
      pendingCurrentPage,
      pendingPageSize
    );
    return paginatePendingVehicleRequests;
  };
  filterApprovedVehicleRequests = () => {
    const {
      approvedVehicleRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allRequests;
    let paginateApprovedVehicleRequests = [];
    if (approvedSearchQuery) {
      allRequests = approvedVehicleRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(approvedSearchQuery.toLowerCase())
      );
      paginateApprovedVehicleRequests = paginate(
        allRequests,
        approvedCurrentPage,
        approvedPageSize
      );
      return paginateApprovedVehicleRequests;
    }
    paginateApprovedVehicleRequests = paginate(
      approvedVehicleRequests,
      approvedCurrentPage,
      approvedPageSize
    );

    return paginateApprovedVehicleRequests;
  };
  render() {
    const {
      pendingVehicleRequests,
      pendingCurrentPage,
      pendingPageSize,
      pendingSearchQuery,
      approvedVehicleRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery,
      pendingRequestsLength,
      approvedRequestsLength
    } = this.state;
    let allPendingVehicleRequests = this.filterPendingVehicleRequests();
    let allApprovedVehicleRequests = this.filterApprovedVehicleRequests();
    return (
      <React.Fragment>
        <div className="container" style={{ background: "#E6F2F3" }}>
          <div className="row">
            <div
              className="col-sm-4 card"
              style={{
                background: "white",
                height: "150px",
                marginLeft: "30px",
                marginTop: "10px"
              }}
            >
              <h4 style={{ marginTop: "30px" }}>
                {" "}
                Pending Requests: {pendingRequestsLength}
              </h4>
            </div>
            <div
              className="col-sm-4 card"
              style={{
                background: "white",
                height: "150px",
                marginLeft: "290px",
                marginTop: "10px"
              }}
            >
              <h4 style={{ marginTop: "30px" }}>
                {" "}
                Approved Requests: {approvedRequestsLength}
              </h4>
            </div>
          </div>
          <div
            className="row card"
            style={{
              background: "white",
              marginTop: "30px",
              marginLeft: "10px",
              marginRight: "10px"
            }}
          >
            <div className="col-lg-12">
              <center>
                <h3>Pending Vehicle Requests</h3>
              </center>
              <div style={{ marginLeft: "820px" }}>
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
                    <th scope="col">VechileName</th>
                    <th scope="col">Model</th>
                    <th scope="col">Rent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allPendingVehicleRequests.map(vehicleRequest => (
                    <tr key={vehicleRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/productOwnerDetails",
                            state: {
                              productOwnerId: vehicleRequest.requester._id
                            }
                          }}
                        >
                          {vehicleRequest.requester.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/vehicleRequestDetails",
                            state: {
                              vehicleRequest: vehicleRequest
                            }
                          }}
                        >
                          {vehicleRequest.vehicleName}
                        </Link>
                      </td>
                      <td>{vehicleRequest.vehicleModel}</td>
                      <td>{vehicleRequest.vehicleRent}</td>
                      <td>{vehicleRequest.memberShipDuration}</td>
                      <td>{vehicleRequest.status}</td>
                      <td>{vehicleRequest.requestDate}</td>
                      <td>
                        <button className="btn btn-primary btn-sm">
                          Update
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pendingPageSize}
                items={pendingVehicleRequests.length}
                currentPage={pendingCurrentPage}
                onPagechange={this.handlePendingPageChange}
              />
            </div>
          </div>
          <div
            className="row card"
            style={{
              background: "white",
              marginTop: "30px",
              marginLeft: "10px",
              marginRight: "10px"
            }}
          >
            <div className="col-lg-12">
              <center>
                <h3>Approved Vehicle Requests</h3>
              </center>
              <div style={{ marginLeft: "820px" }}>
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
                    <th scope="col">VechileName</th>
                    <th scope="col">Model</th>
                    <th scope="col">Rent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allApprovedVehicleRequests.map(vehicleRequest => (
                    <tr key={vehicleRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/productOwnerDetails",
                            state: {
                              productOwnerId: vehicleRequest.requester._id
                            }
                          }}
                        >
                          {vehicleRequest.requester.fullName}
                        </Link>
                      </td>
                      <td>
                        {/* <Link
                              to={{
                                pathname: "/vehicleRequestDetails",
                                state: {
                                  vehicleRequest: vehicleRequest
                                }
                              }}
                            >
                            </Link> */}
                        {vehicleRequest.vehicleName}
                      </td>
                      <td>{vehicleRequest.vehicleModel}</td>
                      <td>{vehicleRequest.vehicleRent}</td>
                      <td>{vehicleRequest.memberShipDuration}</td>
                      <td>{vehicleRequest.status}</td>
                      <td>{vehicleRequest.ApprovedDate}</td>

                      <td>
                        <button className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={approvedPageSize}
                items={approvedVehicleRequests.length}
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

export default VehicleRequests;
