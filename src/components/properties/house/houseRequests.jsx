import React, { Component } from "react";
import {
  getHouseRequests,
  deleteHouseRequest
} from "../../services/properties/house/houseReuestService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class HouseRequests extends Component {
  state = { houseRequests: [] };
  async componentDidMount() {
    const { data: houseRequests } = await getHouseRequests();
    try {
      if (houseRequests) {
        this.setState({ houseRequests });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  handleDelete = async id => {
    const confirm = window.confirm("Do you want to Delete Request?");
    if (confirm) {
      const orignalHouseRequests = this.state.houseRequests;
      const houseRequests = orignalHouseRequests.filter(hr => hr._id !== id);
      this.setState({ houseRequests });
      try {
        const { data: response } = await deleteHouseRequest(id);
        if (response) toast.success("House Request Delete Successfuly");
      } catch (error) {
        if (error.response && error.response.status === 400)
          toast.error(`Error:400 ${error.response.data}`);
        else if (error.response && error.response.status === 404)
          toast.error(`This Request been deleted:404 (not found)`);
        else if (error.response && error.response.status === 401)
          toast.error(`Error:401 ${error.response.statusText}`);
        else if (error.response && error.response.status === 403)
          toast.error(`Error:403 ${error.response.statusText}`);
        else toast.error(`${error.response.data}`);
        this.setState({ houseRequests: orignalHouseRequests });
      }
    }
  };
  render() {
    const { houseRequests } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">Citiy</th>
                    <th scope="col">Location</th>
                    <th scope="col">Area</th>
                    <th scope="col">MonthlyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {houseRequests.map(
                    houseRequest =>
                      houseRequest.status == "Pending" && (
                        <tr key={houseRequest._id}>
                          <td>
                            <Link
                              to={{
                                pathname: "/productOwnerDetails",
                                state: {
                                  productOwnerId: houseRequest.requester._id
                                }
                              }}
                            >
                              {houseRequest.requester.fullName}
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: "/houseRequestDetails",
                                state: {
                                  houseRequest: houseRequest
                                }
                              }}
                            >
                              {houseRequest.city}
                            </Link>
                          </td>
                          <td>{houseRequest.location}</td>
                          <td>{houseRequest.area}</td>
                          <td>{houseRequest.monthlyRent}</td>
                          <td>{houseRequest.memberShipDuration}</td>
                          <td>{houseRequest.status}</td>
                          <td>{houseRequest.requestDate}</td>
                          <td>
                            <Link
                              to={{
                                pathname: "/updateHouseRequest",
                                state: {
                                  houseRequest: houseRequest
                                }
                              }}
                            >
                              <button className="btn btn-primary btn-sm">
                                Update
                              </button>
                            </Link>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                this.handleDelete(houseRequest._id);
                              }}
                            >
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
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">Citiy</th>
                    <th scope="col">Location</th>
                    <th scope="col">Area</th>
                    <th scope="col">MonthlyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {houseRequests.map(
                    houseRequest =>
                      houseRequest.status == "Approved" && (
                        <tr key={houseRequest._id}>
                          <td>
                            <Link
                              to={{
                                pathname: "/productOwnerDetails",
                                state: {
                                  productOwnerId: houseRequest.requester._id
                                }
                              }}
                            >
                              {houseRequest.requester.fullName}
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: "/houseDetails",
                                state: {
                                  houseId: houseRequest._id,
                                  admin: true
                                }
                              }}
                            >
                              {houseRequest.city}
                            </Link>
                          </td>
                          <td>{houseRequest.location}</td>
                          <td>{houseRequest.area}</td>
                          <td>{houseRequest.monthlyRent}</td>
                          <td>{houseRequest.memberShipDuration}</td>
                          <td>{houseRequest.status}</td>
                          <td>{houseRequest.ApprovedDate}</td>
                          <td>
                            <button className="btn btn-primary btn-sm" disabled>
                              Update
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                this.handleDelete(houseRequest._id);
                              }}
                            >
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

export default HouseRequests;
