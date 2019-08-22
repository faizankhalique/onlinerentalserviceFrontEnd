import React, { Component } from "react";
import http from "./services/httpService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getVehicles } from "./services/vehicleService";
import authService from "./services/authService";
import { paginate } from "./../utils/paginate";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
class Vehicle extends Component {
  state = {
    vehicles: [],
    user: {},
    currentPage: 1,
    pageSize: 8,
    searchQuery: ""
  };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: vehicles } = await getVehicles();
      if (vehicles) {
        this.setState({ user, vehicles });
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
  filterVehicles = () => {
    const { vehicles, pageSize, currentPage, searchQuery } = this.state;
    let searchedVehicles = [];
    let paginateVehicles = [];
    if (searchQuery) {
      searchedVehicles = vehicles.filter(v =>
        v.vehicleName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      paginateVehicles = paginate(searchedVehicles, currentPage, pageSize);
      return paginateVehicles;
    }
    paginateVehicles = paginate(vehicles, currentPage, pageSize);
    return paginateVehicles;
  };
  render() {
    const { vehicles, pageSize, currentPage, searchQuery, user } = this.state;

    const allVehicles = this.filterVehicles();
    return (
      <React.Fragment>
        <div className="container-fluid">
          {/* <div className="row">
            <div className="col-lg-12">
              <div
                style={{
                  backgroundImage: `url("/background/carbg1.jpg")`,
                  height: "400px",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  position: "relative",
                  margin: "3px"
                }}
              >
                {" "}
                <div style={{ marginLeft: "1070px" }}>
                  {" "}
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                </div>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-lg-12">
              <div style={{ marginLeft: "1070px" }}>
                {" "}
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
              {allVehicles.map(vehicle => (
                <div key={vehicle._id} style={{ display: "inline-block" }}>
                  <img
                    src={vehicle.vehicleImages[0]}
                    style={{ margin: "10px" }}
                    className="img-responsive"
                    alt="Helpful alt text"
                    width={300}
                    height={250}
                  />
                  <h4 style={{ marginLeft: "12px" }}>
                    {vehicle.vehicleName}
                    {"  "}
                    {vehicle.vehicleModel}
                  </h4>
                  <div style={{ marginLeft: "12px" }}>
                    <Link
                      to={{
                        pathname: "/vehicleDetails",
                        state: {
                          vehicleId: vehicle._id
                        }
                      }}
                    >
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                      >
                        View Details
                      </button>
                    </Link>
                    <Link
                      to={{
                        pathname:
                          user && user.accountType === "renter"
                            ? "/vehicleRentRequestForm"
                            : "/registerUser",
                        state: {
                          vehicle: vehicle
                        }
                      }}
                    >
                      {" "}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                        disabled={
                          (user && user.accountType === "admin") ||
                          (user && user.accountType === "productowner")
                            ? true
                            : false
                        }
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "8px", marginLeft: "12px" }}>
                <Pagination
                  pageSize={pageSize}
                  items={vehicles.length}
                  currentPage={currentPage}
                  onPagechange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Vehicle;
