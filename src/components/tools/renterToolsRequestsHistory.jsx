import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import { getRenterToolRentRequests } from "../services/tools/toolBookingService";

class RenterToolRequestsHistory extends Component {
  state = {
    toolRentRequests: []
  };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: toolRentRequests } = await getRenterToolRentRequests(
        user._id
      );
      if (toolRentRequests) {
        this.setState({ toolRentRequests });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  render() {
    const { toolRentRequests } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ToolName</th>
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
                  {toolRentRequests.map(toolRentRequest => (
                    <tr key={toolRentRequest._id}>
                      <td>{toolRentRequest.tool.toolName}</td>
                      <td>{toolRentRequest.startDate}</td>
                      <td>{toolRentRequest.endDate}</td>
                      <td>{toolRentRequest.status}</td>
                      <td>{toolRentRequest.requestDate}</td>
                      <td>{toolRentRequest.requestTime}</td>
                      <td>{toolRentRequest.ApprovedDate}</td>
                      <td>{toolRentRequest.ApprovedTime}</td>
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

export default RenterToolRequestsHistory;
