import React, { Component } from "react";
import { getRenterVehiclesRequests } from "./services/vehicleRentRequestService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import authService from "./services/authService";
class RenterVehicleRequestsHistory extends Component {
  state = {
    vehicleRentRequests: []
  };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: vehicleRentRequests } = await getRenterVehiclesRequests(
        user._id
      );
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
                    <th scope="col">VechileName</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th scope="col">RequestTime</th>
                    <th scope="col">ApprovedDate</th>
                    <th scope="col">ApprovedTime</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {vehicleRentRequests.map(vehicleRentRequest => (
                    <tr key={vehicleRentRequest._id}>
                      <td>{vehicleRentRequest.vehicle.vehicleName}</td>
                      <td>{vehicleRentRequest.startDate}</td>
                      <td>{vehicleRentRequest.endDate}</td>
                      <td>{vehicleRentRequest.status}</td>
                      <td>{vehicleRentRequest.requestDate}</td>
                      <td>{vehicleRentRequest.requestTime}</td>
                      <td>{vehicleRentRequest.ApprovedDate}</td>
                      <td>{vehicleRentRequest.ApprovedTime}</td>
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

export default RenterVehicleRequestsHistory;
