import React, { Component } from "react";
import { getOwnerShops } from "../../services/registeredProductsService";
import authService from "../../services/authService";
class OwnerShops extends Component {
  state = { shops: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: shops } = await getOwnerShops(user._id);
      if (shops) {
        this.setState({ shops });
      }
    } catch (error) {}
  }
  render() {
    const { shops } = this.state;
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
                  {shops.map(shop => (
                    <tr key={shop._id}>
                      <td>{shop.city}</td>
                      <td>{shop.location}</td>
                      <td>{shop.area}</td>
                      <td>{shop.monthlyRent}</td>
                      <td>{shop.onRent ? "OnRent" : "Free"}</td>
                      <td>
                        {shop.registered ? "Registered" : "Not-Registered"}
                      </td>
                      <td>{shop.memberShipDuration}</td>
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

export default OwnerShops;
