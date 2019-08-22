import React, { Component } from "react";
import { toast } from "react-toastify";
import Select from "./common/select";
import { Link } from "react-router-dom";
import { getRentersDetails } from "./services/allRegisterRenters";
import SearchBox from "./common/searchBox";
import { paginate } from "./../utils/paginate";
import Pagination from "./common/pagination";
class Renters extends Component {
  state = { rentersDetails: [], currentPage: 1, pageSize: 8, searchQuery: "" };
  async componentDidMount() {
    try {
      const { data: rentersDetails } = await getRentersDetails();
      if (rentersDetails) {
        this.setState({ rentersDetails });
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
    const { rentersDetails, pageSize, currentPage, searchQuery } = this.state;
    const allRentersDetails = this.filterRenter();
    console.log(allRentersDetails);
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Vehicles</th>
                    <th>Houses</th>
                    <th>Shops</th>
                    <th>Tools</th>

                    <th>HousePayments</th>
                    <th>ShopPayments</th>
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
                        <div className="dropdown">
                          <Link
                            className="btn btn-primary btn-sm dropdown-toggle"
                            to="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Vehicles Bookings
                          </Link>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            {renterData.vehiclesBookings.map(vehicleBooking => (
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/vehicleBookingDetails",
                                  state: {
                                    vehicleBookingId: vehicleBooking._id
                                  }
                                }}
                              >
                                {`VehicleBooking`}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <Link
                            className="btn btn-primary btn-sm dropdown-toggle"
                            to="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            House Bookings
                          </Link>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            {renterData.housesBookings.map(houseBooking => (
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/houseBookingDetails",
                                  state: {
                                    houseBookingId: houseBooking._id
                                  }
                                }}
                              >
                                {`HouseBooking`}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <Link
                            className="btn btn-primary btn-sm dropdown-toggle"
                            to="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Shop Bookings
                          </Link>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            {renterData.shopsBookings.map(shopBooking => (
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/shopBookingDetails",
                                  state: {
                                    shopBookingId: shopBooking._id
                                  }
                                }}
                              >
                                {`ShopBooking`}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="dropdown">
                          <Link
                            className="btn btn-primary btn-sm dropdown-toggle"
                            to="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Tool Bookings
                          </Link>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            {renterData.toolsBookings.map(toolBooking => (
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/toolBookingDetails",
                                  state: {
                                    toolBookingId: toolBooking._id
                                  }
                                }}
                              >
                                {`ToolBooking`}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <Link
                            className="btn btn-primary btn-sm dropdown-toggle"
                            to="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            House Payments
                          </Link>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            {renterData.housePayments.map(housePayment => (
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/housePayments",
                                  state: {
                                    renterId: renterData._id,
                                    housePaymentId: housePayment._id,
                                    houseBookingId: housePayment.houseBooking,
                                    security: housePayment.security
                                  }
                                }}
                              >
                                {`HousePayment`}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div className="dropdown">
                          <Link
                            className="btn btn-primary btn-sm dropdown-toggle"
                            to="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Shop Payments
                          </Link>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            {renterData.shopPayments.map(shopPayment => (
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/shopPayments",
                                  state: {
                                    renterId: renterData._id,
                                    shopPaymentId: shopPayment._id,
                                    shopBookingId: shopPayment.shopBooking,
                                    security: shopPayment.security
                                  }
                                }}
                              >
                                {`ShopPayment `}
                              </Link>
                            ))}
                          </div>
                        </div>
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
