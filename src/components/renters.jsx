import React, { Component } from "react";
import { toast } from "react-toastify";
import Select from "./common/select";
import { Link } from "react-router-dom";
import { getRentersDetails } from "./services/allRegisterRenters";
class Renters extends Component {
  state = { rentersDetails: [] };
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
  render() {
    const { rentersDetails } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>CNIC</th>
                    <th>PhoneNo</th>
                    <th>Adress</th>
                    <th>Vehicles</th>
                    <th>Houses</th>
                    <th>Shops</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {rentersDetails.map(renterData => (
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
                      <td>{renterData.renter.email}</td>
                      <td>{renterData.renter.cnicNo}</td>
                      <td>{renterData.renter.phoneNo}</td>
                      <td>{renterData.renter.address}</td>
                      <td>
                        -
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
                            {renterData.vehiclesBookings.map(vehiclesBooking => (
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
                                {vehicle.vehicleName}
                              </Link>
                            ))}
                          </div>
                        </div> */}
                      </td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Renters;
