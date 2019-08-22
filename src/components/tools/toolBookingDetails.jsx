import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getRenterToolBooking } from "../services/tools/toolBookingService";

class ToolBookingDetails extends Component {
  state = {
    toolBooking: {},
    toolImage: "",
    toolImages: [],
    tool: {}
  };
  async componentDidMount() {
    const { toolBookingId } = this.props.location.state;
    const { data: toolBooking } = await getRenterToolBooking(toolBookingId);
    if (toolBooking) {
      let tool = toolBooking.tool;
      let toolImage = toolBooking.tool.toolImages[0];
      let toolImages = toolBooking.tool.toolImages;
      this.setState({ toolBooking, toolImage, toolImages, tool });
    }
  }
  handleImage = image => {
    this.setState({ toolImage: image });
  };
  render() {
    const { toolBooking, toolImage, toolImages, tool } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          {toolBooking && (
            <div className="row" style={{ padding: "4px" }}>
              <div className="col-md-6">
                <center>
                  {" "}
                  <h3>Tool Booking Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ToolName</th>
                      <td>
                        <Link
                          to={{
                            pathname: "/toolDetails",
                            state: {
                              toolId: tool._id,
                              admin: true
                            }
                          }}
                        >
                          {tool.toolName}
                        </Link>
                      </td>
                    </tr>

                    <tr>
                      <th>StartDate</th>
                      <td> {toolBooking.startDate}</td>
                    </tr>
                    <tr>
                      <th>EndDate</th>
                      <td> {toolBooking.endDate}</td>
                    </tr>

                    <tr>
                      <th>BookingConfirmation</th>
                      <td>{toolBooking.bookingConfirmation}</td>
                    </tr>
                    <tr>
                      <th>Request-Status</th>
                      <td>{toolBooking.status}</td>
                    </tr>
                    <tr>
                      <th>RequestDate</th>
                      <td>{toolBooking.requestDate}</td>
                    </tr>
                    <tr>
                      <th>RequestTime</th>
                      <td>{toolBooking.requestTime}</td>
                    </tr>
                  </thead>
                </table>
                <div />
              </div>
              <div className="col-md-4" style={{ marginTop: "65px" }}>
                <img
                  src={toolImage}
                  style={{ height: "400px", width: "500px" }}
                />
                <br />
                <br />
                {toolBooking &&
                  toolImages.map(image => (
                    <img
                      key={image}
                      src={image}
                      style={{ height: "50px", width: "50px", margin: "8px" }}
                      onClick={() => {
                        this.handleImage(image);
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ToolBookingDetails;
