import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  confirmToolBooking,
  getToolBookings
} from "../services/tools/toolBookingService";
import { addToolBooking } from "../services/allRegisterRenters";
class ToolBookings extends Component {
  state = { toolBookings: [] };
  async componentDidMount() {
    try {
      const { data: toolBookings } = await getToolBookings();
      if (toolBookings) this.setState({ toolBookings });
    } catch (error) {
      toast.error("" + error);
    }
  }
  handleBooking = async (bookingId, renterId) => {
    try {
      const confirm = window.confirm("Do you want to confirm Tool Booking?");
      if (confirm) {
        const { data } = await confirmToolBooking(bookingId);
        if (data) {
          toast.success("Tool Booking Confirm successfully");
          const { data: result2 } = await addToolBooking({
            bookingId: bookingId,
            renterId: renterId
          });
          if (result2)
            toast.success("Booking add into AllRegisterRenters Successfully");
          setTimeout(() => {
            window.location.pathname = "/renters";
          }, 2000);
        }
      }
    } catch (error) {
      toast.error(error + "");
    }
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
                    <th scope="col">BookingStatus</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {toolBookings &&
                    toolBookings.map(
                      toolBooking =>
                        toolBooking.bookingStatus == "Pending" && (
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
                            <td>{toolBooking.payment.security}</td>
                            <td>{toolBooking.payment.totalRent}</td>
                            <td>{toolBooking.bookingStatus}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  this.handleBooking(
                                    toolBooking._id,
                                    toolBooking.renter._id
                                  );
                                }}
                              >
                                Confirm
                              </button>
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
          {/* <div className="row">
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
                    <th scope="col">BookingStatus</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {toolBookings &&
                    toolBookings.map(
                      toolBooking =>
                        toolBooking.bookingStatus == "Confirm" && (
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
                            <td>{toolBooking.payment.security}</td>
                            <td>{toolBooking.payment.totalRent}</td>
                            <td>{toolBooking.bookingStatus}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  this.handleBooking(
                                    toolBooking._id,
                                    toolBooking.renter._id
                                  );
                                }}
                              >
                                Update
                              </button>
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
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default ToolBookings;
