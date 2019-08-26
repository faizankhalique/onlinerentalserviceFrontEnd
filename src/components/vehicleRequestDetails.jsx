import React, { Component } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import {
  approvedVehicleRequest,
  sendEmail
} from "./services/vehicleRequestService";
import { addVehicle } from "./services/vehicleService";
import Input from "./common/input";
import Select from "./common/select";
import TextArea from "./common/textArea";
import { addOwnerVehicle } from "./services/registeredProductsService";
import { Link } from "react-router-dom";
class VehicleRequestDetails extends Component {
  state = {
    account: {
      receipent: "",
      subject: "",
      emailMessage: ""
    },
    errors: [],
    vehicleRequest: {},
    requester: {},
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
    // const { handle } = this.props.match.params;
    const { vehicleRequest } = this.props.location.state;
    const requester = vehicleRequest.requester;
    const vehicleImage = vehicleRequest.vehicleImages[0];
    const vehicleImages = vehicleRequest.vehicleImages;
    this.setState({ vehicleRequest, requester, vehicleImage, vehicleImages });
    const account = { ...this.state.account };
    account.receipent = requester.email;
    this.setState({ account });
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
  handleApprovedRequest = async (requestId, requesterID) => {
    const isConfirm = window.confirm("Do you Want to Approved Request?");
    if (isConfirm) {
      const { vehicleRequest } = this.state;
      try {
        const { data: response1 } = await approvedVehicleRequest(requestId);
        if (response1) {
          toast.success("Request Approved Sucessfully");
          const {
            vehicleName,
            vehicleModel,
            vehicleNo,
            vehicleCompany,
            fuelType,
            vehicleType,
            vehicleColour,
            seatCapacity,
            vehicleRent,
            memberShipDuration,
            vehicleImages
          } = vehicleRequest;
          const vehicle = {
            vehicleName,
            vehicleModel,
            vehicleNo,
            vehicleCompany,
            fuelType,
            vehicleType,
            vehicleColour,
            seatCapacity,
            vehicleRent,
            memberShipDuration,
            vehicleImages
          };
          const response2 = await addVehicle(vehicle);
          if (response2) {
            toast.success("vehicle Add into Vehicles Successfully");
            const { data: vehicleId } = response2;
            const { data: response3 } = await addOwnerVehicle(
              requesterID,
              vehicleId
            );
            if (response3) {
              toast.success(
                "vechile add into owner registeredProducts successfully"
              );

              setTimeout(() => {
                this.props.history.replace("/vehicleRequests");
              }, 1500);
            }
          }
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
      vehicleRequest,
      requester,
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
                    <th>VehicleName</th>
                    <td>{vehicleRequest.vehicleName}</td>
                  </tr>
                  <tr>
                    <th>VehicleModel</th>
                    <td>{vehicleRequest.vehicleModel}</td>
                  </tr>
                  <tr>
                    <th>VehicleN0</th>
                    <td> {vehicleRequest.vehicleNo}</td>
                  </tr>
                  <tr>
                    <th>VehicleType</th>
                    <td>{vehicleRequest.vehicleType}</td>
                  </tr>
                  <tr>
                    <th>VehicleColour</th>
                    <td>{vehicleRequest.vehicleColour}</td>
                  </tr>
                  <tr>
                    <th>VehicleCompany</th>
                    <td>{vehicleRequest.vehicleCompany}</td>
                  </tr>
                  <tr>
                    <th>VehicleRent</th>
                    <td>{vehicleRequest.vehicleRent}</td>
                  </tr>
                  <tr>
                    <th>Request-Status</th>
                    <td>{vehicleRequest.status}</td>
                  </tr>
                  <tr>
                    <th>MemberShip</th>
                    <td>{vehicleRequest.memberShipDuration}</td>
                  </tr>
                  <tr>
                    <th>RequestDate</th>
                    <td>{vehicleRequest.requestDate}</td>
                  </tr>
                </thead>
              </table>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.handleApprovedRequest(vehicleRequest._id, requester._id);
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
                <button type="submit" className="btn btn-success btn-block">
                  Send
                </button>
              </form>
              <div />
            </div>
            <div className="col-md-4" style={{ marginTop: "65px" }}>
              <img
                src={vehicleImage}
                style={{ height: "420px", width: "510px" }}
              />
              {vehicleRequest &&
                vehicleImages.map(image => (
                  <img
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

export default VehicleRequestDetails;
