import React, { Component } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import {
  updateVehicleRequest,
  sendEmail
} from "./services/vehicleRequestService";
import { addVehicle } from "./services/vehicleService";
import Input from "./common/input";
import Select from "./common/select";
import TextArea from "./common/textArea";
import { addOwnerVehicle } from "./services/registeredProductsService";
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
    vehicleImage: ""
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
    console.log("images", vehicleRequest.vehicleImages[0]);
    const vehicleImage = vehicleRequest.vehicleImages[0];
    this.setState({ vehicleRequest, requester, vehicleImage });
    const account = { ...this.state.account };
    account.receipent = requester.email;
    this.setState({ account });
  }
  // handleApproved = async id => {};
  // handleNotApproved = () => {
  //   toast.error("Not -approved");
  // };
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
    const { account, vehicleRequest, requester } = this.state;
    const subject = account.subject;
    if (subject === "Your Request Approved") {
      try {
        const response1 = await updateVehicleRequest(vehicleRequest._id);
        if (response1) {
          toast.success("approved Successfully" + vehicleRequest._id);
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
            toast.success("vehicle Add Successfully");
            const { data: vehicleId } = response2;
            const response3 = await addOwnerVehicle(requester._id, vehicleId);
            if (response3) {
              toast.success("vechile add into owner successfully");
              const emailData = account;
              const reponse4 = await sendEmail(emailData);
              if (reponse4) {
                toast.success("Approved Email Send Successfully");
                this.props.history.replace("/vehicleRequests");
              }
            }
          }
        }
      } catch (error) {
        toast.error(error + "");
      }
    }
    if (subject === "Your Request Not-Approved!") {
      try {
        const emailData = account;
        const reponse3 = await sendEmail(emailData);
        if (reponse3) {
          toast.success("Not-Approved! Email Send Successfully");
          this.props.history.replace("/vehicleRequests");
        }
      } catch (error) {
        toast.error(error + "");
      }
    }
  };
  render() {
    const {
      vehicleRequest,
      requester,
      vehicleImage,
      account,
      errors
    } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div
            className="row"
            style={{ padding: "6px", border: "1px solid black" }}
          >
            <div className="col-md-6">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>RequesterName</th>
                    <td>{requester.fullName}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{requester.email}</td>
                  </tr>
                  <tr>
                    <th>Phone-No</th>
                    <td>{requester.phoneNo}</td>
                  </tr>
                  <tr>
                    <th>CNIC-No</th>
                    <td>{requester.cnicNo}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{requester.address}</td>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="col-md-4">
              <img
                src={requester.userImage}
                alt="xyx"
                style={{
                  height: "200px",
                  width: "300px"
                }}
              />
            </div>
          </div>
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

              <form onSubmit={this.handleSubmit} style={{ padding: "4px" }}>
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VehicleRequestDetails;
