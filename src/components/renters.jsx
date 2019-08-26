import React, { Component } from "react";
import { toast } from "react-toastify";
import Select from "./common/select";
import { Link } from "react-router-dom";
import { getRentersDetails } from "./services/allRegisterRenters";
import SearchBox from "./common/searchBox";
import { paginate } from "./../utils/paginate";
import Pagination from "./common/pagination";
class Renters extends Component {
  state = {
    rentersDetails: [],
    bookingsDetails: {},
    currentPage: 1,
    pageSize: 8,
    searchQuery: ""
  };
  async componentDidMount() {
    try {
      const { data } = await getRentersDetails();
      if (data) {
        const { renterDetails: rentersDetails, bookingsDetails } = data;

        this.setState({ rentersDetails, bookingsDetails });
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
  filterRenter = () => {
    const { rentersDetails, pageSize, currentPage, searchQuery } = this.state;
    let searchedRenter = [];
    let paginateRenter = [];
    if (searchQuery) {
      searchedRenter = rentersDetails.filter(renterDetail =>
        renterDetail.renter.fullName
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase())
      );
      paginateRenter = paginate(searchedRenter, currentPage, pageSize);
      return paginateRenter;
    }
    paginateRenter = paginate(rentersDetails, currentPage, pageSize);
    return paginateRenter;
  };
  render() {
    const {
      rentersDetails,
      bookingsDetails,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;
    const allRentersDetails = this.filterRenter();

    return (
      <React.Fragment>
        <div className="container">
          <div class="row" style={{ marginTop: "8px" }}>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div class="card h-70">
                <div class="card-body">
                  <h4 class="card-title">
                    <Link to="#">Vehicles</Link>
                  </h4>
                  <p class="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      CurrentBookings: {bookingsDetails.vehiclesOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      TodayEndBookings:{" "}
                      {bookingsDetails.todayVehiclesEndBookings}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div class="card h-70">
                <div class="card-body">
                  <h4 class="card-title">
                    <Link to="#">Houses</Link>
                  </h4>
                  <p class="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      CurrentBookings: {bookingsDetails.housesOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      TodayEndBookings: {bookingsDetails.todayHousesEndBookings}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div class="card h-70">
                <div class="card-body">
                  <h4 class="card-title">
                    <Link to="#">Shops</Link>
                  </h4>
                  <p class="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      CurrentBookings: {bookingsDetails.shopsOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      TodayEndBookings: {bookingsDetails.todayShopsEndBookings}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div class="card h-70">
                <div class="card-body">
                  <h4 class="card-title">
                    <Link to="#">Tools</Link>
                  </h4>
                  <p class="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      CurrentBookings: {bookingsDetails.toolsOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      TodayEndBookings: {bookingsDetails.todayToolsEndBookings}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
              <table className="table" style={{ backgroundColor: "white" }}>
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Vehicles</th>
                    <th>Houses</th>
                    <th>Shops</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {allRentersDetails.map(renterData => (
                    <tr key={renterData._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterDetails",
                            state: {
                              renterId: renterData.renter._id
                            }
                          }}
                        >
                          {renterData.renter.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterAllVehiclesBookingsDetails",
                            state: {
                              // vehicleBookingId: vehicleBooking._id,
                              renterId: renterData.renter._id
                            }
                          }}
                        >
                          <button className="btn btn-sm btn-primary">
                            Vehicles Bookings
                          </button>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterAllHousesBookingsDetails",
                            state: {
                              // vehicleBookingId: vehicleBooking._id,
                              renterId: renterData.renter._id
                            }
                          }}
                        >
                          <button className="btn btn-sm btn-primary">
                            House Bookings
                          </button>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterAllShopsBookingsDetails",
                            state: {
                              // vehicleBookingId: vehicleBooking._id,
                              renterId: renterData.renter._id
                            }
                          }}
                        >
                          <button className="btn btn-sm btn-primary">
                            Shop Bookings
                          </button>
                        </Link>
                      </td>

                      <td>
                        <Link
                          to={{
                            pathname: "/renterAllToolsBookingsDetails",
                            state: {
                              // vehicleBookingId: vehicleBooking._id,
                              renterId: renterData.renter._id
                            }
                          }}
                        >
                          <button className="btn btn-sm btn-primary">
                            Tools Bookings
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pageSize}
                items={rentersDetails.length}
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

export default Renters;
