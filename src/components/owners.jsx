import React, { Component } from "react";
import { toast } from "react-toastify";
import { getOwnersDetails } from "./services/registeredProductsService";
import Select from "./common/select";
import { Link } from "react-router-dom";
import { paginate } from "./../utils/paginate";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
class Owners extends Component {
  state = { ownersDetails: [], currentPage: 1, pageSize: 5, searchQuery: "" };
  async componentDidMount() {
    try {
      const { data: ownersDetails } = await getOwnersDetails();
      if (ownersDetails) {
        this.setState({ ownersDetails });
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
    const { ownersDetails, pageSize, currentPage, searchQuery } = this.state;
    const allOwnersDetails = this.filterOwner();
    return (
      <React.Fragment>
        <div className="container" style={{ background: "#E6F2F3" }}>
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
