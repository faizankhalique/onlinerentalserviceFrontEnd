import React, { Component } from "react";
import { getVehiclesRentRequests } from "./services/vehicleRentRequestService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class VehicleRentRequests extends Component {
  state = {
    vehicleRentRequests: []
  };
  async componentDidMount() {
    try {
      const { data: vehicleRentRequests } = await getVehiclesRentRequests();
      if (vehicleRentRequests) {
        this.setState({ vehicleRentRequests });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  render() {
    const { vehicleRentRequests } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
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
                  {vehicleRentRequests.map(
                    vehicleRentRequest =>
                      vehicleRentRequest.status == "Not-Approved" && (
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
                            <button className="btn btn-sm btn-danger">
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
            <div className="col-sm-12">
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
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {vehicleRentRequests.map(
                    vehicleRentRequest =>
                      vehicleRentRequest.status == "Approved" && (
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

                          <td>
                            <button className="btn btn-sm btn-danger">
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
        </div>
      </React.Fragment>
    );
  }
}

export default VehicleRentRequests;
