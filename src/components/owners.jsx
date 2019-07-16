import React, { Component } from "react";
import { toast } from "react-toastify";
import { getOwnersDetails } from "./services/registeredProductsService";
import Select from "./common/select";
import { Link } from "react-router-dom";
class Owners extends Component {
  state = { ownersDetails: [] };
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
  render() {
    const { ownersDetails } = this.state;

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
                  {ownersDetails.map(onwerData => (
                    <tr key={onwerData._id}>
                      <td>{onwerData.owner.fullName}</td>
                      <td>{onwerData.owner.email}</td>
                      <td>{onwerData.owner.cnicNo}</td>
                      <td>{onwerData.owner.phoneNo}</td>
                      <td>{onwerData.owner.address}</td>
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
                            Vehicles
                          </Link>

                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            {onwerData.vehicles.map(vehicle => (
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
                        </div>
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

export default Owners;
