import React, { Component } from "react";
import { getOwnerVehiclesRequests } from "./services/vehicleRequestService";
import authService from "./services/authService";
class OwnerVehicleRequestsHistory extends Component {
  state = { vehicleRequests: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: vehicleRequests } = await getOwnerVehiclesRequests(
        user._id
      );
      if (vehicleRequests) {
        this.setState({ vehicleRequests });
      }
    } catch (error) {}
  }
  render() {
    const { vehicleRequests } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">VechileName</th>
                    <th scope="col">Model</th>
                    <th scope="col">Rent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleRequests.map(vehicleRequest => (
                    <tr key={vehicleRequest._id}>
                      <td>{vehicleRequest.vehicleName}</td>
                      <td>{vehicleRequest.vehicleModel}</td>
                      <td>{vehicleRequest.vehicleRent}</td>
                      <td>{vehicleRequest.memberShipDuration}</td>
                      <td>{vehicleRequest.status}</td>
                      <td>{vehicleRequest.requestDate}</td>
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

export default OwnerVehicleRequestsHistory;
