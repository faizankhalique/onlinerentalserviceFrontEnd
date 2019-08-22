import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
class OwnerAllVehiclesDetails extends Component {
  state = {
    vehicles: [],
    vehicleOnRent: "",
    freeVehicles: "",
    currentPage: 1,
    pageSize: 5,
    searchQuery: ""
  };
  componentDidMount() {
    const { vehicles } = this.props.location.state;
    let vehicleOnRent = 0;
    let freeVehicles = 0;
    for (const vehicle of vehicles) {
      if (vehicle.onRent === true) vehicleOnRent++;
      else freeVehicles++;
    }
    this.setState({ vehicles, vehicleOnRent, freeVehicles });
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  filterOwnerVehicles = () => {
    const { vehicles, pageSize, currentPage, searchQuery } = this.state;
    let searchedVehicles = [];
    let paginateVehicles = [];
    if (searchQuery) {
      searchedVehicles = vehicles.filter(vehicle =>
        vehicle.vehicleName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      paginateVehicles = paginate(searchedVehicles, currentPage, pageSize);
      return paginateVehicles;
    }
    paginateVehicles = paginate(vehicles, currentPage, pageSize);
    return paginateVehicles;
  };
  render() {
    const {
      vehicles,
      vehicleOnRent,
      freeVehicles,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;
    const allVehicles = this.filterOwnerVehicles();
    return (
      <React.Fragment>
        <div className="container" style={{ background: "#E6F2F3" }}>
          <div className="row">
            <div
              className="col-sm-3 card"
              style={{
                background: "white",
                height: "120px",
                marginLeft: "30px",
                marginTop: "10px"
              }}
            >
              <b style={{ marginTop: "5px" }}>
                {" "}
                TotalVehicles: {vehicles.length}
              </b>
              <b style={{ marginTop: "20px" }}>
                {" "}
                VehiclesOnRent: {vehicleOnRent}
              </b>
              <b style={{ marginTop: "20px" }}> FreeVehicles: {freeVehicles}</b>
            </div>
            {/* <div
              className="col-sm-3 card"
              style={{
                background: "white",
                height: "120px",
                marginLeft: "120px",
                marginTop: "10px"
              }}
            >
              <b style={{ marginTop: "20px" }}> FreeVehicles: {freeVehicles}</b>
            </div> */}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
              <table
                className="table"
                style={{ background: "white", marginTop: "10px" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">VechileName</th>
                    <th scope="col">Model</th>
                    <th scope="col">Vehicle-No</th>
                    <th scope="col">Rent</th>
                    <th scope="col">OnRent</th>
                    <th scope="col">Registered</th>
                    <th scope="col">MemberShipDuration</th>
                  </tr>
                </thead>
                <tbody>
                  {allVehicles.map(vehicle => (
                    <tr key={vehicle._id}>
                      <td>
                        {" "}
                        <Link
                          to={{
                            pathname: "/vehicleDetails",
                            state: {
                              vehicleId: vehicle._id,
                              admin: true
                            }
                          }}
                        >
                          {vehicle.vehicleName}
                        </Link>
                      </td>
                      <td>{vehicle.vehicleModel}</td>
                      <td>{vehicle.vehicleNo}</td>
                      <td>{vehicle.vehicleRent}</td>
                      <td>{vehicle.onRent ? "OnRent" : "Free"}</td>
                      <td>
                        {vehicle.registered ? "Registered" : "Not-Registered"}
                      </td>
                      <td>{vehicle.memberShipDuration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pageSize}
                items={vehicles.length}
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

export default OwnerAllVehiclesDetails;
