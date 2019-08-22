import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getToolRentRequests } from "../services/tools/toolBookingService";
class ToolBookings extends Component {
  state = { toolBookings: [] };
  async componentDidMount() {
    try {
      const { data: toolBookings } = await getToolRentRequests();
      if (toolBookings) this.setState({ toolBookings });
    } catch (error) {
      toast.error("" + error);
    }
  }
  handleBooking = requestId => {
    toast.success(requestId);
  };
  handleDelete = requestId => {
    const isConfim = window.confirm("Do you want to Delete?");
    if (isConfim) {
      toast.error(requestId);
    }
  };
  render() {
    const { toolBookings } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">ToolName</th>
                    <th scope="col">ToolOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Security</th>
                    <th scope="col">Rent</th>
                    <th scope="col">Confirmation</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {toolBookings &&
                    toolBookings.map(
                      toolBooking =>
                        toolBooking.bookingConfirmation == "Pending" && (
                          <tr key={toolBooking._id}>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterDetails",
                                  state: {
                                    renterId: toolBooking.renter._id
                                  }
                                }}
                              >
                                {toolBooking.renter.fullName}
                              </Link>
                            </td>
                            <td>{toolBooking.tool.toolName}</td>
                            <td>{toolBooking.owner.fullName}</td>
                            <td>{toolBooking.startDate}</td>
                            <td>{toolBooking.endDate}</td>
                            <td>{toolBooking.security}</td>
                            <td>{toolBooking.rent}</td>
                            <td>{toolBooking.bookingConfirmation}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/confirmToolBooking",
                                  state: {
                                    toolBooking: toolBooking
                                  }
                                }}
                              >
                                <button
                                  className="btn btn-primary btn-sm"
                                  // onClick={() => {
                                  //   this.handleBooking(toolBooking._id);
                                  // }}
                                >
                                  Confirm
                                </button>
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  this.handleDelete(toolBooking._id);
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
            <h3 style={{ marginLeft: "350px" }}>Confirm Booking Table</h3>

            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">ToolName</th>
                    <th scope="col">ToolOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Security</th>
                    <th scope="col">Rent</th>
                    <th scope="col">Confirmation</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {toolBookings &&
                    toolBookings.map(
                      toolBooking =>
                        toolBooking.bookingConfirmation == "Confirm" && (
                          <tr key={toolBooking._id}>
                            <td>
                              <Link
                                to={{
                                  pathname: "/renterDetails",
                                  state: {
                                    renterId: toolBooking.renter._id
                                  }
                                }}
                              >
                                {toolBooking.renter.fullName}
                              </Link>
                            </td>
                            <td>{toolBooking.tool.toolName}</td>
                            <td>{toolBooking.owner.fullName}</td>
                            <td>{toolBooking.startDate}</td>
                            <td>{toolBooking.endDate}</td>
                            <td>{toolBooking.security}</td>
                            <td>{toolBooking.rent}</td>
                            <td>{toolBooking.bookingConfirmation}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: "/confirmToolBooking",
                                  state: {
                                    toolBooking: toolBooking
                                  }
                                }}
                              >
                                <button
                                  className="btn btn-primary btn-sm"
                                  // onClick={() => {
                                  //   this.handleBooking(toolBooking._id);
                                  // }}
                                >
                                  Update
                                </button>
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  this.handleDelete(toolBooking._id);
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

export default ToolBookings;
