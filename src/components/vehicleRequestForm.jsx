import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import UploadFiles from "./common/uploadFiles";
import Input from "./common/input";
import {
  addVehicleRequest,
  updateVehicleRequest
} from "./services/vehicleRequestService";
import Select from "./common/select";
import authService from "./services/authService";

class VehicleRequestForm extends Component {
  state = {
    account: {
      requester: "",
      vehicleName: "",
      vehicleModel: "",
      vehicleNo: "",
      vehicleCompany: "",
      fuelType: "",
      vehicleType: "",
      vehicleColour: "",
      seatCapacity: "",
      vehicleRent: "",
      memberShipDuration: "",
      vehicleImages: []
    },
    errors: [],
    imageStatus: false,
    vehicleRequestId: ""
  };
  temp = [];
  schema = {
    requester: Joi.string(),
    vehicleName: Joi.string()
      .min(3)
      .max(255)
      .required(),
    vehicleModel: Joi.string()
      .min(3)
      .max(255)
      .required(),
    vehicleCompany: Joi.string()
      .min(3)
      .max(255)
      .required(),
    vehicleNo: Joi.string()
      .min(5)
      .max(255)
      .required(),
    vehicleType: Joi.string()
      .min(3)
      .max(255)
      .required(),
    vehicleColour: Joi.string()
      .min(3)
      .max(255)
      .required(),
    seatCapacity: Joi.number()
      .min(4)
      .required(),
    fuelType: Joi.string()
      .min(3)
      .max(255)
      .required(),
    vehicleRent: Joi.number()
      .min(1)
      .required(),
    memberShipDuration: Joi.string().required(),
    vehicleImages: Joi.array().required()
  };
  componentDidMount() {
    if (window.location.pathname == "/updateVehicleRequest") {
      const { vehicleRequest } = this.props.location.state;

      const account = {
        requester: vehicleRequest.requester._id,
        vehicleName: vehicleRequest.vehicleName,
        vehicleModel: vehicleRequest.vehicleModel,
        vehicleNo: vehicleRequest.vehicleNo,
        vehicleCompany: vehicleRequest.vehicleCompany,
        fuelType: vehicleRequest.filesType,
        vehicleType: vehicleRequest.vehicleType,
        vehicleColour: vehicleRequest.vehicleColour,
        seatCapacity: vehicleRequest.vehicleColour,
        vehicleRent: vehicleRequest.vehicleRent,
        memberShipDuration: vehicleRequest.memberShipDuration,
        vehicleImages: vehicleRequest.vehicleImages
      };
      this.setState({
        account,
        imageStatus: true,
        vehicleRequestId: vehicleRequest._id
      });
    } else {
      const user = authService.getCurrentUser();
      const { account } = { ...this.state };
      account.requester = user._id;
      this.setState({ account });
    }
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
    try {
      const { account: vehicleRequest, vehicleRequestId } = this.state;
      // console.log(vehicleRequest);
      if (window.location.pathname == "/updateVehicleRequest") {
        const { data: response } = await updateVehicleRequest(
          vehicleRequestId,
          vehicleRequest
        );
        if (response) {
          toast.success("Vehicle Request Successfully");
          window.location.href = "/vehicleRequests";
        }
      }
      // else {
      //   const { data: response } = await addVehicleRequest(vehicleRequest);
      //   if (response) {
      //     toast.success("Your Request send to Admin Successfully");
      //     window.location.href = "/vehicleRequestForm";
      //   }
      // }
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("" + error.response.data);
      else toast.error("" + error);
    }
  };
  handleImageStatus = images => {
    // this.temp = images;
    const account = { ...this.state.account };
    account.vehicleImages = images;
    this.setState({ imageStatus: true, account });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form
                onSubmit={this.handleSubmit}
                className="card"
                style={{
                  background: "#13232f",
                  boxSizing: " border-box",
                  // maxWidth: "900px",
                  // marginLeft: "100px",
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
                  {window.location.pathname == "/updateVehicleRequest"
                    ? "Update Vehicle Request"
                    : "Vehicle Request Form"}
                </h1>
                <div className="form-group">
                  <Input
                    label="Vehicle Name"
                    name="vehicleName"
                    type="text"
                    value={account.vehicleName}
                    onChange={this.handleChange}
                    errors={errors.vehicleName}
                  />
                  <Input
                    label="Vehicle Model"
                    name="vehicleModel"
                    type="text"
                    value={account.vehicleModel}
                    onChange={this.handleChange}
                    errors={errors.vehicleModel}
                  />
                  <Input
                    label="Vehicle No"
                    name="vehicleNo"
                    type="text"
                    value={account.vehicleNo}
                    onChange={this.handleChange}
                    errors={errors.vehicleNo}
                  />
                  <Input
                    label="Vehicle Company"
                    name="vehicleCompany"
                    type="text"
                    value={account.vehicleCompany}
                    onChange={this.handleChange}
                    errors={errors.vehicleCompany}
                  />
                  <Input
                    label="Vehicle Colour"
                    name="vehicleColour"
                    type="text"
                    value={account.vehicleColour}
                    onChange={this.handleChange}
                    errors={errors.vehicleColour}
                  />
                  <Select
                    label="Fuel Type"
                    name="fuelType"
                    onChange={this.handleChange}
                    value=""
                    options={["Gas", "Petrol", "Diesel"]}
                    errors={errors.fuelType}
                  />
                  <Select
                    label="Seat Capacity"
                    name="seatCapacity"
                    value={account.seatCapacity}
                    onChange={this.handleChange}
                    options={[4, 8, 12, 16, 32]}
                    errors={errors.seatCapacity}
                  />
                  <Select
                    label="Vehicle Type"
                    name="vehicleType"
                    onChange={this.handleChange}
                    value={account.vehicleType}
                    options={["Car", "Wagon", "Bus"]}
                    errors={errors.vehicleType}
                  />
                  <Select
                    label="Member-Ship"
                    name="memberShipDuration"
                    onChange={this.handleChange}
                    value={account.memberShipDuration}
                    options={["6 Months", "1 Year", "2 Years"]}
                    errors={errors.memberShipDuration}
                  />
                  <Input
                    label="Vehicle Rent"
                    name="vehicleRent"
                    type="text"
                    value={account.vehicleRent}
                    onChange={this.handleChange}
                    errors={errors.vehicleRent}
                  />
                  <UploadFiles
                    filesLength={2}
                    fileSize={8.5}
                    filesType={[
                      "image/png",
                      "image/jpeg",
                      "image/gif",
                      "image/jpg"
                    ]}
                    url="productimages"
                    onImageStatus={this.handleImageStatus}
                  />
                  <button
                    style={{ marginTop: "4px" }}
                    disabled={this.state.imageStatus ? false : true}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Vehicle
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

export default VehicleRequestForm;
