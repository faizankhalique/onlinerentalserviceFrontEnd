import React, { Component } from "react";
import { getVehiclesRequests } from "./services/vehicleRequestService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class VehicleRequests extends Component {
  state = {
    vehicleRequests: []
  };
  async componentDidMount() {
    try {
      const reponse = await getVehiclesRequests();
      if (reponse) {
        const { data: vehicleRequests } = reponse;
        this.setState({ vehicleRequests });
        console.log("vehiclerequests", this.state.vehicleRequests);
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { vehicleRequests } = this.state;
    return (
      <React.Fragment>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">RequesterName</th>
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
                <td>{vehicleRequest.requester.fullName}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/vehicleRequestDetails",
                      state: {
                        vehicleRequest: vehicleRequest
                      }
                    }}
                  >
                    {vehicleRequest.vehicleName}
                  </Link>
                </td>
                <td>{vehicleRequest.vehicleModel}</td>
                <td>{vehicleRequest.vehicleRent}</td>
                <td>{vehicleRequest.memberShipDuration}</td>
                <td>{vehicleRequest.status}</td>
                <td>{vehicleRequest.requestDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default VehicleRequests;
