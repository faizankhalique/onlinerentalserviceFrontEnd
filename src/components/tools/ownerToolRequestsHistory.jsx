import React, { Component } from "react";
import authService from "../services/authService";
import { getOwnerToolRequests } from "../services/tools/toolRequestService";
class OwnerToolRequestsHistory extends Component {
  state = { toolRequests: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: toolRequests } = await getOwnerToolRequests(user._id);
      if (toolRequests) {
        this.setState({ toolRequests });
      }
    } catch (error) {}
  }
  render() {
    const { toolRequests } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ToolName</th>
                    <th scope="col">Company</th>
                    <th scope="col">DailyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                  </tr>
                </thead>
                <tbody>
                  {toolRequests.map(toolRequest => (
                    <tr key={toolRequest._id}>
                      <td>{toolRequest.toolName}</td>
                      <td>{toolRequest.company}</td>
                      <td>{toolRequest.dailyRent}</td>
                      <td>{toolRequest.memberShipDuration}</td>
                      <td>{toolRequest.status}</td>
                      <td>{toolRequest.requestDate}</td>
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

export default OwnerToolRequestsHistory;
