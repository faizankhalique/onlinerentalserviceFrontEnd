import React, { Component } from "react";
import authService from "../services/authService";
import { getOwnerTools } from "../services/registeredProductsService";
class OwnerTools extends Component {
  state = { tools: [] };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: tools } = await getOwnerTools(user._id);
      if (tools) {
        this.setState({ tools });
      }
    } catch (error) {}
  }
  render() {
    const { tools } = this.state;
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
                    <th scope="col">OnRent</th>
                    <th scope="col">Registered</th>
                    <th scope="col">MemberShipDuration</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map(tool => (
                    <tr key={tool._id}>
                      <td>{tool.toolName}</td>
                      <td>{tool.company}</td>
                      <td>{tool.dailyRent}</td>
                      <td>{tool.onRent ? "OnRent" : "Free"}</td>
                      <td>
                        {tool.registered ? "Registered" : "Not-Registered"}
                      </td>
                      <td>{tool.memberShipDuration}</td>
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

export default OwnerTools;
