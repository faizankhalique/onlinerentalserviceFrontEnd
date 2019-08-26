import React, { Component } from "react";
import { toast } from "react-toastify";
import { getOwnersDetails } from "./services/registeredProductsService";
import Select from "./common/select";
import { Link } from "react-router-dom";
import { paginate } from "./../utils/paginate";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { getProductsData } from "./services/reportService";
class Owners extends Component {
  state = {
    ownersDetails: [],
    productsDetails: {},
    currentPage: 1,
    pageSize: 4,
    searchQuery: ""
  };
  async componentDidMount() {
    try {
      const { data: ownersDetails } = await getOwnersDetails();
      if (ownersDetails) {
        const { data: productsDetails } = await getProductsData();
        this.setState({ ownersDetails, productsDetails });
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
  filterOwner = () => {
    const { ownersDetails, pageSize, currentPage, searchQuery } = this.state;
    let searchedOwner = [];
    let paginateOwner = [];
    if (searchQuery) {
      searchedOwner = ownersDetails.filter(ownerDetail =>
        ownerDetail.owner.fullName
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase())
      );
      paginateOwner = paginate(searchedOwner, currentPage, pageSize);
      return paginateOwner;
    }
    paginateOwner = paginate(ownersDetails, currentPage, pageSize);
    return paginateOwner;
  };
  render() {
    const {
      ownersDetails,
      productsDetails,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;
    const allOwnersDetails = this.filterOwner();
    return (
      <React.Fragment>
        <div className="container" style={{ background: "#E6F2F3" }}>
          <div className="row" style={{ marginTop: "8px" }}>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to="#">Vehicles</Link>
                  </h4>
                  <p className="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      Total: {productsDetails.totalVehicles}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      OnRent: {productsDetails.totalVehiclesOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Free: {productsDetails.totalVehiclesFree}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to="#">Houses</Link>
                  </h4>
                  <p className="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      Total: {productsDetails.totalHouses}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      OnRent: {productsDetails.totalHousesOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Free: {productsDetails.totalHousesFree}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to="#">Shops</Link>
                  </h4>
                  <p className="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      Total: {productsDetails.totalShops}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      OnRent: {productsDetails.totalShopsOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Free: {productsDetails.totalShopsFree}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to="#">Tools</Link>
                  </h4>
                  <p className="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      Total: {productsDetails.totalTools}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      OnRent: {productsDetails.totalToolsOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Free: {productsDetails.totalToolsFree}
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
              <table className="table" style={{ background: "white" }}>
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    {/* <th>CNIC</th> */}
                    <th>PhoneNo</th>
                    {/* <th>Adress</th> */}
                    <th>Vehicles</th>
                    <th>Houses</th>
                    <th>Shops</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {allOwnersDetails.map(ownerData => (
                    <tr key={ownerData._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/productOwnerDetails",
                            state: {
                              productOwnerId: ownerData.owner._id
                            }
                          }}
                        >
                          {ownerData.owner.fullName}
                        </Link>
                      </td>
                      <td>{ownerData.owner.email}</td>
                      {/* <td>{ownerData.owner.cnicNo}</td> */}
                      <td>{ownerData.owner.phoneNo}</td>
                      {/* <td>{ownerData.owner.address}</td> */}
                      <td>
                        <Link
                          to={{
                            pathname: "/ownerAllVehiclesDetails",
                            state: {
                              vehicles: ownerData.vehicles
                            }
                          }}
                        >
                          <button className="btn btn-primary btn-sm">
                            VehiclesDetails
                          </button>
                        </Link>
                        {/* <div className="dropdown">
                          <Link
                            className="btn btn-primary btn-sm dropdown-toggle"
                            to="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Vehicles
                          </Link>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            {ownerData.vehicles.map(vehicle => (
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/vehicleDetails",
                                  state: {
                                    vehicleId: vehicle._id,
                                    admin: true
                                  }
                                }}
                              >
                                {`${vehicle.vehicleName}  ${vehicle.vehicleNo}`}
                              </Link>
                            ))}
                          </div>
                        </div> */}
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/ownerAllHousesDetails",
                            state: {
                              houses: ownerData.houses
                            }
                          }}
                        >
                          <button className="btn btn-primary btn-sm">
                            HousesDetails
                          </button>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/ownerAllShopsDetails",
                            state: {
                              shops: ownerData.shops
                            }
                          }}
                        >
                          <button className="btn btn-primary btn-sm">
                            ShopsDetails
                          </button>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/ownerAllToolsDetails",
                            state: {
                              tools: ownerData.tools
                            }
                          }}
                        >
                          <button className="btn btn-primary btn-sm">
                            ToolDetails
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pageSize}
                items={ownersDetails.length}
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

export default Owners;
