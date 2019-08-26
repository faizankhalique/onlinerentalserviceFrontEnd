import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getRenterToolBookings } from "../services/tools/toolBookingService";
class RenterAllToolsBookingsDetails extends Component {
  state = { toolsBookings: [] };
  async componentDidMount() {
    const { renterId } = this.props.location.state;
    try {
      const { data: toolsBookings } = await getRenterToolBookings(renterId);
      if (toolsBookings) {
        this.setState({ toolsBookings });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  render() {
    const { toolsBookings } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ToolName</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">BookingStatus</th>
                    <th scope="col">Days</th>
                    <th scope="col">TotalRent</th>
                    <th scope="col">OwnerRent</th>
                    <th scope="col">Commission</th>
                    <th scope="col">Security</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {toolsBookings.map(
                    toolBooking =>
                      toolBooking.bookingStatus != "Pending" && (
                        <tr key={toolBooking._id}>
                          <td>{toolBooking.tool.toolName}</td>
                          <td>{toolBooking.startDate}</td>
                          <td>{toolBooking.endDate}</td>
                          <td>{toolBooking.bookingStatus}</td>
                          <td>{toolBooking.payment.totalDays}</td>
                          <td>{toolBooking.payment.totalRent}</td>
                          <td>{toolBooking.payment.ownerRent}</td>
                          <td>{toolBooking.payment.commission}</td>
                          <td>{toolBooking.payment.security}</td>
                          <td>
                            <Link
                              style={{
                                visibility:
                                  toolBooking.bookingStatus == "Confirm"
                                    ? "visible"
                                    : "hidden"
                              }}
                              to={{
                                pathname: "/confirmToolBooking",
                                state: {
                                  toolBooking: toolBooking
                                }
                              }}
                            >
                              <button className="btn btn-primary btn-sm">
                                Update
                              </button>
                            </Link>
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

export default RenterAllToolsBookingsDetails;
