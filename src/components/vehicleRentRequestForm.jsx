import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import TextArea from "./common/textArea";
import { addVehicleRentRequest } from "./services/vehicleRentRequestService";
import diff_days from "../utils/diff_days";
import { toast } from "react-toastify";
class VehicleRentRequestForm extends Component {
  state = {
    account: {
      requester: "sadd",
      vehicle: "",

      purpose: "",
      licenseNo: "",
      startDate: "",
      endDate: ""
    },
    errors: [],
    vehicleImage: "",
    vehicleRent: "",
    vehicle: {}
  };
  schema = {
    requester: Joi.string(),
    vehicle: Joi.string(),

    purpose: Joi.string().required(),
    licenseNo: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  };
  componentDidMount() {
    const { vehicle } = this.props.location.state;

    const account = { ...this.state.account };
    let vehicleImage = { ...this.state.vehicleImage };
    vehicleImage = vehicle.vehicleImages[0];
    account.vehicle = vehicle._id;

    this.setState({
      account,
      vehicleImage,
      vehicle,
      vehicleRent: vehicle.vehicleRent
    });
  }
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
  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log("errors", errors);
    if (errors) return;
    const { account, vehicleRent } = this.state;
    const date1 = new Date(account.startDate + ",00:00");
    const date2 = new Date(account.endDate + ",00:00");
    let days = 0;
    let totalRent = 0;
    if (date2 > date1) {
      days = parseInt(diff_days(date2, date1));
      totalRent = days * parseInt(vehicleRent);
    } else if (date1 > date2) {
      toast.error("endDate must be greater than  startdate.");
      return;
    } else {
      totalRent = 1 * parseInt(vehicleRent);
      days = 1;
    }
    try {
      const vehicleRentRequest = { ...this.state.account };
      const confirm = window.confirm(
        `your total rent will be ${totalRent} of ${days} days. Do you want to submit request?`
      );
      if (confirm) {
        const response = await addVehicleRentRequest(vehicleRentRequest);
        if (response) {
          toast.success("Your request send to Admin Successfully");
          window.location.href = "/";
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("" + error.response.data);
      else toast.error("" + error);
    }
  };
  render() {
    const { account, errors, vehicleImage, vehicle } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <form
                onSubmit={this.handleSubmit}
                className="card"
                style={{
                  background: "#13232f",
                  boxSizing: " border-box",
                  padding: "10px"
                }}
              >
                <h4
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    marginLeft: "170px",
                    color: "#CDCDCD"
                  }}
                >
                  Vehicle Rent Request Form
                </h4>
                <div className="form-group">
                  <Input
                    label="StartDate"
                    name="startDate"
                    type="date"
                    value={account.startDate}
                    onChange={this.handleChange}
                    errors={errors.startDate}
                  />
                  <Input
                    label="EndDate"
                    name="endDate"
                    type="date"
                    value={account.endDate}
                    onChange={this.handleChange}
                    errors={errors.endDate}
                  />
                  <Input
                    label="LicenseNo"
                    name="licenseNo"
                    type="text"
                    value={account.licenseNo}
                    onChange={this.handleChange}
                    errors={errors.licenseNo}
                  />
                  <TextArea
                    label="Purpose"
                    name="purpose"
                    type="text"
                    value={account.purpose}
                    onChange={this.handleChange}
                    errors={errors.purpose}
                    placeholder=" "
                  />
                  <button
                    style={{ marginTop: "4px" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
            <div className="col-sm-6">
              <center>
                <img
                  className="rounded"
                  src={vehicleImage}
                  alt="xyz"
                  style={{
                    width: "500px",
                    height: "450px"
                  }}
                />
                <h4 style={{ marginLeft: "12px" }}>
                  {vehicle.vehicleName}
                  {"  "}
                  {vehicle.vehicleModel}
                </h4>
              </center>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VehicleRentRequestForm;
