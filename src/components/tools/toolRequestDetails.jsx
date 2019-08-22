import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { addOwnerTool } from "../services/registeredProductsService";
import Input from "./../common/input";
import Select from "./../common/select";
import TextArea from "./../common/textArea";
import { Link } from "react-router-dom";
import {
  approvedToolRequest,
  sendEmail
} from "../services/tools/toolRequestService";
class ToolRequestDetails extends Component {
  state = {
    account: {
      receipent: "",
      subject: "",
      emailMessage: ""
    },
    errors: [],
    shopImage: "",
    shopImages: []
  };
  schema = {
    receipent: Joi.string()
      .email()
      .max(255)
      .required(),
    subject: Joi.string()
      .min(2)
      .max(255)
      .required(),
    emailMessage: Joi.string().required()
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  handleChange = e => {
    const { currentTarget: input } = e;
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  componentDidMount() {
    // const { handle } = this.props.match.params;
    const { toolRequest } = this.props.location.state;
    const requester = toolRequest.requester;
    const toolImage = toolRequest.toolImages[0];
    const toolImages = toolRequest.toolImages;
    this.setState({ toolRequest, requester, toolImage, toolImages });
    const account = { ...this.state.account };
    account.receipent = requester.email;
    this.setState({ account });
  }
  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const isConfirm = window.confirm("Do you Want to send Email?");
    if (isConfirm) {
      try {
        const emailData = this.state.account;
        const { data: result } = await sendEmail(emailData);
        if (result) toast.success("Email send successfuly");
      } catch (error) {
        toast.error(error + "");
      }
    }
  };
  handleApprovedRequest = async (requesterId, requestId) => {
    const isConfirm = window.confirm("Do you Want to Approved Request?");
    if (isConfirm) {
      try {
        const { data: reponse } = await addOwnerTool(requesterId, requestId);
        if (reponse) {
          toast.success("Tool Add into registeredProducts successfully");
          const { data: response2 } = await approvedToolRequest(requestId);
          if (response2) {
            toast.success("Tool Request Approved successfully");
          }
        }
      } catch (error) {
        toast.error(error + "");
      }
    }
  };
  handleImage = image => {
    this.setState({ toolImage: image });
  };
  render() {
    const {
      toolRequest,
      requester,
      toolImage,
      toolImages,
      account,
      errors
    } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          {toolRequest && (
            <div
              className="row"
              style={{ padding: "4px", border: "1px solid black" }}
            >
              <div className="col-md-6">
                <center>
                  {" "}
                  <h3>Tool Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Requster Name</th>
                      <td>
                        <Link
                          to={{
                            pathname: "/productOwnerDetails",
                            state: {
                              productOwnerId: requester._id
                            }
                          }}
                        >
                          {requester.fullName}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th>ToolName</th>
                      <td>{toolRequest.toolName}</td>
                    </tr>
                    <tr>
                      <th>Company</th>
                      <td>{toolRequest.company}</td>
                    </tr>
                    <tr>
                      <th>Request-Status</th>
                      <td>{toolRequest.status}</td>
                    </tr>
                    <tr>
                      <th>DailyRent</th>
                      <td>{toolRequest.dailyRent}</td>
                    </tr>
                    <tr>
                      <th>MemberShip</th>
                      <td>{toolRequest.memberShipDuration}</td>
                    </tr>
                    <tr>
                      <th>RequestDate</th>
                      <td>{toolRequest.requestDate}</td>
                    </tr>
                  </thead>
                </table>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.handleApprovedRequest(requester._id, toolRequest._id);
                  }}
                >
                  Approved Request
                </button>
                <form
                  onSubmit={this.handleSubmit}
                  style={{
                    padding: "4px",
                    backgroundColor: "#E6F2F3",
                    marginTop: "10px"
                  }}
                >
                  <Input
                    label="Email Address"
                    name="receipent"
                    type="email"
                    value={account.receipent}
                    onChange={this.handleChange}
                    errors={errors.receipent}
                    pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})*$"
                    placeholder="someone@gmail.com"
                    color="black"
                  />
                  <Select
                    label="Subject"
                    name="subject"
                    onChange={this.handleChange}
                    value={account.subject}
                    options={[
                      "Your Request Approved",
                      "Your Request Not-Approved!"
                    ]}
                    errors={errors.subject}
                    color="black"
                  />
                  <TextArea
                    label="Email Message"
                    name="emailMessage"
                    type="text"
                    value={account.emailMessage}
                    onChange={this.handleChange}
                    errors={errors.emailMessage}
                    placeholder="Email Message..."
                    color="black"
                  />
                  <button
                    type="submit"
                    className="btn btn-success btn-block"
                    // onClick={() => {
                    //   this.handleApproved(shopRequest._id);
                    // }}
                    // disabled={account.emailMessage ? false : true}
                  >
                    Send
                  </button>
                </form>
                <div />
              </div>
              <div className="col-md-4" style={{ marginTop: "65px" }}>
                <img
                  src={toolImage}
                  style={{ height: "450px", width: "500px" }}
                />
                <br />
                <br />
                {toolRequest &&
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

export default ToolRequestDetails;
