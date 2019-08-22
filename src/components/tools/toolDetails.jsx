import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import { getTool } from "../services/tools/toolRequestService";
class ToolDetails extends Component {
  state = {
    tool: {},
    toolImage: "",
    admin: false,
    user: {},
    toolImages: []
  };
  async componentDidMount() {
    try {
      const { toolId, admin } = this.props.location.state;
      const user = authService.getCurrentUser();
      const { data: tool } = await getTool(toolId);
      if (tool) {
        const toolImage = tool.toolImages[0];
        this.setState({
          tool,
          toolImage,
          admin,
          user: user,
          toolImages: tool.toolImages
        });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  handleImage = image => {
    this.setState({ toolImage: image });
  };
  render() {
    const { tool, toolImage, toolImages, admin, user } = this.state;
    return (
      <React.Fragment>
        {tool && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <center>
                  {" "}
                  <h3>Tool Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ToolName</th>
                      <td>{tool.toolName}</td>
                    </tr>
                    <tr>
                      <th>Company</th>
                      <td>{tool.company}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{tool.description}</td>
                    </tr>
                    <tr>
                      <th>DailyRent</th>
                      <td>{tool.dailyRent}</td>
                    </tr>
                    {admin && (
                      <React.Fragment>
                        <tr>
                          <th>MemberShipDuration</th>
                          <td>{tool.memberShipDuration}</td>
                        </tr>
                        <tr>
                          <th>Registred</th>
                          <td>{tool.registered.toString()}</td>
                        </tr>
                        <tr>
                          <th>toolOnRent</th>
                          <td>{tool.onRent.toString()}</td>
                        </tr>
                      </React.Fragment>
                    )}
                  </thead>
                </table>
                {admin || (
                  <Link
                    to={{
                      pathname:
                        user && user.accountType === "renter"
                          ? "/toolRentRequestForm"
                          : "/registerUser",
                      state: {
                        tool: tool
                      }
                    }}
                  >
                    {" "}
                    <button
                      className="btn btn-primary btn-sm btn-block"
                      style={{ margin: "2px" }}
                      disabled={
                        (user && user.accountType === "admin") ||
                        (user && user.accountType === "productowner")
                          ? true
                          : false
                      }
                    >
                      Book Now
                    </button>
                  </Link>
                )}
              </div>
              <div
                className="col-md-6"
                style={{ marginTop: "65px", marginLeft: "60px" }}
              >
                <img
                  src={toolImage}
                  style={{
                    height: "400px",
                    width: "600px",
                    border: "1px solid black"
                  }}
                />
                <br />
                <br />
                {tool &&
                  toolImages.map(image => (
                    <img
                      key={image}
                      src={image}
                      style={{
                        height: "50px",
                        width: "50px",
                        margin: "8px",
                        border: "1px solid black"
                      }}
                      onClick={() => {
                        this.handleImage(image);
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ToolDetails;
