import React, { Component } from "react";
import { getOwnerVehicles } from "./services/registeredProductsService";
import authService from "./services/authService";
class OwnerVehicles extends Component {
  state = { vehicles: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: vehicles } = await getOwnerVehicles(user._id);
      if (vehicles) {
        this.setState({ vehicles });
      }
    } catch (error) {}
  }
  render() {
    const { vehicles } = this.state;
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
                    <th scope="col">Vehicle-No</th>
                    <th scope="col">Rent</th>
                    <th scope="col">OnRent</th>
                    <th scope="col">Registered</th>
                    <th scope="col">MemberShipDuration</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(vehicle => (
                    <tr key={vehicle._id}>
                      <td>{vehicle.vehicleName}</td>
                      <td>{vehicle.vehicleModel}</td>
                      <td>{vehicle.vehicleNo}</td>
                      <td>{vehicle.vehicleRent}</td>
                      <td>{vehicle.onRent ? "OnRent" : "Free"}</td>
                      <td>
                        {vehicle.registered ? "Registered" : "Not-Registered"}
                      </td>
                      <td>{vehicle.memberShipDuration}</td>
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

export default OwnerVehicles;
