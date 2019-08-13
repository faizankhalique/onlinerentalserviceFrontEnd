import React, { Component } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Input from "./common/input";
import Select from "./common/select";
import TextArea from "./common/textArea";
import { Link } from "react-router-dom";
import {
  updateVehicleRentRequest,
  sendEmail
} from "./services/vehicleRentRequestService";
class VehicleRentRequestDetails extends Component {
  state = {
    account: {
      receipent: "",
      subject: "",
      emailMessage: ""
    },
    errors: [],
    vehicleRentRequest: {},
    requester: {},
    vehicle: {},
    vehicleOwner: {},
    vehicleImage: "",
    vehicleImages: []
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
  componentDidMount() {
    const { vehicleRentRequest } = this.props.location.state;
    const requester = vehicleRentRequest.requester;
    const vehicle = vehicleRentRequest.vehicle;
    const vehicleOwner = vehicleRentRequest.vehicleOwner;
    const vehicleImage = vehicleRentRequest.vehicle.vehicleImages[0];
    const vehicleImages = vehicleRentRequest.vehicle.vehicleImages;
    this.setState({
      vehicleRentRequest,
      requester,
      vehicleImage,
      vehicleImages,
      vehicle,
      vehicleOwner
    });
    const account = { ...this.state.account };
    account.receipent = requester.email;
    this.setState({ account });
    console.log(this.state);
  }
  handleChange = e => {
    const { currentTarget: input } = e;
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log("errors", errors);
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
  handleApprovedRequest = async requestId => {
    const isConfirm = window.confirm("Do you Want to Approved Request?");
    if (isConfirm) {
      try {
        const vehicleRentRequest = this.state.vehicleRentRequest;
        const { data: result } = await updateVehicleRentRequest(
          requestId,
          vehicleRentRequest
        );
        if (result) {
          toast.success("Request Approved successfuly");
          setTimeout(() => {
            window.location.href = "/vehicleRentRequests";
          }, 1800);
        }
      } catch (error) {
        toast.error(error + "");
      }
    }
  };
  handleImage = image => {
    this.setState({ vehicleImage: image });
  };
  render() {
    const {
      vehicleRentRequest,
      requester,
      vehicle,
      vehicleOwner,
      vehicleImage,
      vehicleImages,
      account,
      errors
    } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div
            className="row"
            style={{ padding: "4px", border: "1px solid black" }}
          >
            <div className="col-md-6">
              <center>
                {" "}
                <h3>Vehicle Details</h3>
              </center>
              <br />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>VehicleName</th>
                    <td>
                      <Link
                        to={{
                          pathname: "/vehicleDetails",
                          state: {
                            vehicleId: vehicle._id,
                            admin: true
                          }
                        }}
                      >
                        {vehicle.vehicleName}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>VehicleOwner</th>
                    <td>
                      <Link
                        to={{
                          pathname: "/productOwnerDetails",
                          state: {
                            productOwnerId: vehicleOwner._id
                          }
                        }}
                      >
                        {vehicleOwner.fullName}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>Requester Name</th>
                    <td>
                      <Link
                        to={{
                          pathname: "/renterDetails",
                          state: {
                            renterId: requester._id
                          }
                        }}
                      >
                        {requester.fullName}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>StartDate</th>
                    <td> {vehicleRentRequest.startDate}</td>
                  </tr>
                  <tr>
                    <th>EndDate</th>
                    <td> {vehicleRentRequest.endDate}</td>
                  </tr>

                  <tr>
                    <th>Request-Status</th>
                    <td>{vehicleRentRequest.status}</td>
                  </tr>
                  <tr>
                    <th>RequestDate</th>
                    <td>{vehicleRentRequest.requestDate}</td>
                  </tr>
                  <tr>
                    <th>RequestTime</th>
                    <td>{vehicleRentRequest.requestTime}</td>
                  </tr>
                </thead>
              </table>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.handleApprovedRequest(vehicleRentRequest._id);
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
                  //   this.handleApproved(vehicleRequest._id);
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
                src={vehicleImage}
                style={{ height: "300px", width: "300px" }}
              />
              <br />
              <br />
              {vehicleRentRequest &&
                vehicleImages.map(image => (
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
        </div>
      </React.Fragment>
    );
  }
}

export default VehicleRentRequestDetails;
