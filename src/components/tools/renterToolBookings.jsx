import React, { Component } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";
import { getRenterToolBookings } from "../services/tools/toolBookingService";
class RenterToolsBookings extends Component {
  state = { toolBookings: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: toolBookings } = await getRenterToolBookings(user._id);
      if (toolBookings.length > 0) this.setState({ toolBookings });
    } catch (error) {
      toast.error("" + error);
    }
  }
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
                    <th scope="col">ToolName</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Security</th>
                    <th scope="col">Rent</th>
                    <th scope="col">Confirmation</th>
                  </tr>
                </thead>
                <tbody>
                  {toolBookings &&
                    toolBookings.map(toolBooking => (
                      <tr key={toolBooking._id}>
                        <td>{toolBooking.tool.toolName}</td>
                        <td>{toolBooking.startDate}</td>
                        <td>{toolBooking.endDate}</td>
                        <td>{toolBooking.security}</td>
                        <td>{toolBooking.rent}</td>
                        <td>{toolBooking.bookingConfirmation}</td>
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

export default RenterToolsBookings;
