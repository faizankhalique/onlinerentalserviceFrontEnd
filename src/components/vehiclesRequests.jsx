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
    currentPage: 1,
    pageSize: 4,
    searchQuery: ""
  };
  async componentDidMount() {
    try {
      const reponse = await getVehiclesRequests();
      if (reponse) {
        const { data: vehicleRequests } = reponse;
        this.setState({ vehicleRequests });
        console.log("vehiclerequests", this.state.vehicleRequests);
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  filterVehicleRequests = () => {
    const { vehicleRequests, pageSize, currentPage, searchQuery } = this.state;
    let allRequests;
    if (searchQuery) {
      allRequests = vehicleRequests.filter(v =>
        // v.ApprovedDate.toLowerCase().startsWith(searchQuery.toLowerCase())
        v.requester.fullName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      const paginateVehicleRequests = paginate(
        allRequests,
        currentPage,
        pageSize
      );
      return paginateVehicleRequests;
    }
    const paginateVehicleRequests = paginate(
      vehicleRequests,
      currentPage,
      pageSize
    );
    return paginateVehicleRequests;
  };
  render() {
    const { vehicleRequests, pageSize, currentPage, searchQuery } = this.state;
    const allVehicleRequests = this.filterVehicleRequests();
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
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
                  {vehicleRequests.map(
                    vehicleRequest =>
                      vehicleRequest.status == "Not-Approved" && (
                        <tr key={vehicleRequest._id}>
                          <Link
                            to={{
                              pathname: "/productOwnerDetails",
                              state: {
                                productOwnerId: vehicleRequest.requester._id
                              }
                            }}
                          >
                            <td>{vehicleRequest.requester.fullName}</td>
                          </Link>
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
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div style={{ marginLeft: "780px" }}>
                {" "}
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
                  {allVehicleRequests.map(
                    vehicleRequest =>
                      vehicleRequest.status == "Approved" && (
                        <tr key={vehicleRequest._id}>
                          <Link
                            to={{
                              pathname: "/productOwnerDetails",
                              state: {
                                productOwnerId: vehicleRequest.requester._id
                              }
                            }}
                          >
                            <td>{vehicleRequest.requester.fullName}</td>
                          </Link>
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
                      )
                  )}
                </tbody>
              </table>
              <Pagination
                pageSize={pageSize}
                items={vehicleRequests.length}
                currentPage={currentPage}
                onPagechange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VehicleRequests;
