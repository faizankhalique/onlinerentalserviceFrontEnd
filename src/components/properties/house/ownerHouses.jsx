import React, { Component } from "react";
import { getOwnerHouses } from "../../services/registeredProductsService";
import authService from "../../services/authService";
class OwnerHouses extends Component {
  state = { houses: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: houses } = await getOwnerHouses(user._id);
      if (houses) {
        this.setState({ houses });
      }
    } catch (error) {}
  }
  render() {
    const { houses } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">City</th>
                    <th scope="col">Location</th>
                    <th scope="col">Area</th>
                    <th scope="col">Rent</th>
                    <th scope="col">OnRent</th>
                    <th scope="col">Registered</th>
                    <th scope="col">MemberShipDuration</th>
                  </tr>
                </thead>
                <tbody>
                  {houses.map(house => (
                    <tr key={house._id}>
                      <td>{house.city}</td>
                      <td>{house.location}</td>
                      <td>{house.area}</td>
                      <td>{house.monthlyRent}</td>
                      <td>{house.onRent ? "OnRent" : "Free"}</td>
                      <td>
                        {house.registered ? "Registered" : "Not-Registered"}
                      </td>
                      <td>{house.memberShipDuration}</td>
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

export default OwnerHouses;
