import React, { Component } from "react";
import {
  getVehiclesRentRequests,
  deleteVehicleRentRequest
} from "./services/vehicleRentRequestService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { paginate } from "./../utils/paginate";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
class VehicleRentRequests extends Component {
  state = {
    vehicleRentRequests: [],
    pendingVehicleRentRequests: [],
    approvedVehicleRentRequests: [],
    pendingCurrentPage: 1,
    pendingPageSize: 4,
    pendingSearchQuery: "",
    approvedCurrentPage: 1,
    approvedPageSize: 4,
    approvedSearchQuery: ""
  };
  async componentDidMount() {
    try {
      const { data: vehicleRentRequests } = await getVehiclesRentRequests();
      if (vehicleRentRequests) {
        let pendingVehicleRentRequests = vehicleRentRequests.filter(
          vr => vr.status == "Pending"
        );
        let approvedVehicleRentRequests = vehicleRentRequests.filter(
          vr => vr.status == "Approved"
        );
        this.setState({
          vehicleRentRequests,
          pendingVehicleRentRequests,
          approvedVehicleRentRequests
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
  filterPendingVehicleRentRequests = () => {
    const {
      pendingVehicleRentRequests,
      pendingPageSize,
      pendingCurrentPage,
      pendingSearchQuery
    } = this.state;
    let allRequests;
    let paginatePendingVehicleRentRequests = [];
    if (pendingSearchQuery) {
      allRequests = pendingVehicleRentRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(pendingSearchQuery.toLowerCase())
      );
      paginatePendingVehicleRentRequests = paginate(
        allRequests,
        pendingCurrentPage,
        pendingPageSize
      );
      return paginatePendingVehicleRentRequests;
    }
    paginatePendingVehicleRentRequests = paginate(
      pendingVehicleRentRequests,
      pendingCurrentPage,
      pendingPageSize
    );
    return paginatePendingVehicleRentRequests;
  };
  filterApprovedVehicleRentRequests = () => {
    const {
      approvedVehicleRentRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allRequests;
    let paginateApprovedVehicleRentRequests = [];
    if (approvedSearchQuery) {
      allRequests = approvedVehicleRentRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(approvedSearchQuery.toLowerCase())
      );
      paginateApprovedVehicleRentRequests = paginate(
        allRequests,
        approvedCurrentPage,
        approvedPageSize
      );
      return paginateApprovedVehicleRentRequests;
    }
    paginateApprovedVehicleRentRequests = paginate(
      approvedVehicleRentRequests,
      approvedCurrentPage,
      approvedPageSize
    );

    return paginateApprovedVehicleRentRequests;
  };
  handelDelete = async id => {
    const confirm = window.confirm("Do you want to delete this request?");
    if (confirm) {
      const orignalVehicleRentRequests = this.state.pendingVehicleRentRequests;
      const pendingVehicleRentRequests = orignalVehicleRentRequests.filter(
        vr => vr._id !== id
      );
      this.setState({ pendingVehicleRentRequests });

      try {
        const { data: response } = await deleteVehicleRentRequest(id);
        if (response) {
          toast.success("Vehicle Rent Request Delete Successfuly");
        }
      } catch (error) {
        if (error.response && error.response.status === 400)
          toast.error(`Error:400 ${error.response.data}`);
        else if (error.response && error.response.status === 404)
          toast.error(`This Request been deleted:404 Please Refresh the page`);
        else if (error.response && error.response.status === 401)
          toast.error(`Error:401 ${error.response.statusText}`);
        else if (error.response && error.response.status === 403)
          toast.error(`Error:403 ${error.response.statusText}`);
        else toast.error(`${error.response.data}`);
        this.setState({
          pendingVehicleRentRequests: orignalVehicleRentRequests
        });
      }
    }
  };

  render() {
    const {
      pendingVehicleRentRequests,
      pendingCurrentPage,
      pendingPageSize,
      pendingSearchQuery,
      approvedVehicleRentRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allPendingVehicleRentRequests = this.filterPendingVehicleRentRequests();
    let allApprovedVehicleRentRequests = this.filterApprovedVehicleRentRequests();
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3>Pending Vehicle Rent Requests</h3>
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
                    <th scope="col">VechileName</th>
                    <th scope="col">VechileOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allPendingVehicleRentRequests.map(vehicleRentRequest => (
                    <tr key={vehicleRentRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterDetails",
                            state: {
                              renterId: vehicleRentRequest.requester._id
                            }
                          }}
                        >
                          {vehicleRentRequest.requester.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/vehicleRentRequestDetails",
                            state: {
                              vehicleRentRequest: vehicleRentRequest
                            }
                          }}
                        >
                          {vehicleRentRequest.vehicle.vehicleName}
                        </Link>
                      </td>
                      <td>{vehicleRentRequest.vehicleOwner.fullName}</td>
                      <td>{vehicleRentRequest.startDate}</td>
                      <td>{vehicleRentRequest.endDate}</td>
                      <td>{vehicleRentRequest.status}</td>
                      <td>{vehicleRentRequest.requestDate}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            this.handelDelete(vehicleRentRequest._id);
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
                items={pendingVehicleRentRequests.length}
                currentPage={pendingCurrentPage}
                onPagechange={this.handlePendingPageChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3>Approved Vehicle Rent Requests</h3>
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
                    <th scope="col">VechileName</th>
                    <th scope="col">VechileOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                  </tr>
                </thead>
                <tbody>
                  {allApprovedVehicleRentRequests.map(vehicleRentRequest => (
                    <tr key={vehicleRentRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterDetails",
                            state: {
                              renterId: vehicleRentRequest.requester._id
                            }
                          }}
                        >
                          {vehicleRentRequest.requester.fullName}
                        </Link>
                      </td>

                      <td>
                        <Link
                          to={{
                            pathname: "/vehicleDetails",
                            state: {
                              vehicleId: vehicleRentRequest.vehicle._id,
                              admin: true
                            }
                          }}
                        >
                          {vehicleRentRequest.vehicle.vehicleName}
                        </Link>
                      </td>
                      <td>{vehicleRentRequest.vehicleOwner.fullName}</td>
                      <td>{vehicleRentRequest.startDate}</td>
                      <td>{vehicleRentRequest.endDate}</td>
                      <td>{vehicleRentRequest.status}</td>
                      <td>{vehicleRentRequest.ApprovedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={approvedPageSize}
                items={approvedVehicleRentRequests.length}
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

export default VehicleRentRequests;
