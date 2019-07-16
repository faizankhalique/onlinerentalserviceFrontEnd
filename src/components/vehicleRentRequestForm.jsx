import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import TextArea from "./common/textArea";
import { addVehicleRentRequest } from "./services/vehicleRentRequestService";
import { toast } from "react-toastify";
class VehicleRentRequestForm extends Component {
  state = {
    account: {
      requester: "sadd",
      duration: "",
      purpose: "",
      licenseNo: "",
      startDate: "",
      endDate: ""
    },
    errors: []
  };
  schema = {
    requester: Joi.string(),
    duration: Joi.string().required(),
    purpose: Joi.string().required(),
    licenseNo: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
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
  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log("errors", errors);
    if (errors) return;
    try {
      const vehicleRentRequest = { ...this.state.account };
      console.log(vehicleRentRequest);
      const response = await addVehicleRentRequest(vehicleRentRequest);
      if (response) {
        toast.success("Your request send to Admin Successfully");
        window.location.href = "/vehicleRentRequestForm";
      }
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("" + error.response.data);
      else toast.error("" + error);
    }
  };
  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-10">
              <form
                onSubmit={this.handleSubmit}
                className="card"
                style={{
                  background: "#13232f",
                  boxSizing: " border-box",
                  padding: "10px"
                }}
              >
                <h1
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    marginLeft: "170px",
                    color: "#CDCDCD"
                  }}
                >
                  Vehicle Rent Request Form
                </h1>
                <div className="form-group">
                  <Input
                    label="Duration"
                    name="duration"
                    type="text"
                    value={account.duration}
                    onChange={this.handleChange}
                    errors={errors.duration}
                  />
                  <Input
                    label="LicenseNo"
                    name="licenseNo"
                    type="text"
                    value={account.licenseNo}
                    onChange={this.handleChange}
                    errors={errors.licenseNo}
                  />
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VehicleRentRequestForm;
