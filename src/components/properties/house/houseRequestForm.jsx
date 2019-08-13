import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import Input from "./../../common/input";
import Select from "./../../common/select";
import UploadFiles from "./../../common/uploadFiles";
import {
  addHouseRequest,
  updateHouseRequest
} from "../../services/properties/house/houseReuestService";
class HouseRequestForm extends Component {
  state = {
    account: {
      requester: "",
      city: "",
      location: "",
      area: "",
      portions: "",
      bedRooms: "",
      kitchens: "",
      baths: "",
      lawn: "",
      monthlyRent: "",
      memberShipDuration: "",
      houseImages: []
    },
    errors: [],
    imageStatus: false,
    houseRequestId: ""
  };
  schema = {
    requester: Joi.string(),
    city: Joi.string()
      .min(3)
      .max(256)
      .required(),
    location: Joi.string()
      .min(3)
      .max(256)
      .required(),
    area: Joi.number()
      .min(1)
      .required(),
    portions: Joi.number()
      .min(1)
      .required(),
    bedRooms: Joi.number()
      .min(1)
      .required(),
    kitchens: Joi.number()
      .min(1)
      .required(),
    baths: Joi.number()
      .min(1)
      .required(),
    lawn: Joi.string().required(),
    monthlyRent: Joi.number()
      .min(1)
      .required(),
    memberShipDuration: Joi.string().required(),
    houseImages: Joi.array().required()
  };
  componentDidMount() {
    if (window.location.pathname == "/updateHouseRequest") {
      const { houseRequest } = this.props.location.state;
      const account = {
        requester: houseRequest.requester._id,
        city: houseRequest.city,
        location: houseRequest.location,
        area: houseRequest.area,
        portions: houseRequest.portions,
        bedRooms: houseRequest.bedRooms,
        kitchens: houseRequest.kitchens,
        baths: houseRequest.baths,
        lawn: houseRequest.lawn,
        monthlyRent: houseRequest.monthlyRent,
        memberShipDuration: houseRequest.memberShipDuration,
        houseImages: houseRequest.houseImages
      };
      this.setState({
        account,
        imageStatus: true,
        houseRequestId: houseRequest._id
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
    if (errors) return;

    try {
      const { account: houseRequest, houseRequestId } = { ...this.state };
      if (window.location.pathname == "/updateHouseRequest") {
        const { data: response } = await updateHouseRequest(
          houseRequestId,
          houseRequest
        );
        if (response) {
          toast.success("Request Update Successfully");
          window.location.href = "/houseRequests";
        }
      } else {
        const { data: response } = await addHouseRequest(houseRequest);
        if (response) {
          toast.success("Your Request send to Admin Successfully");
          window.location.href = "/houseRequestForm";
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("" + error.response.data);
      else toast.error("" + error);
    }
  };
  handleImageStatus = images => {
    const account = { ...this.state.account };
    account.houseImages = images;
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
                  padding: "10px"
                }}
              >
                <h1
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    marginLeft: "260px",
                    color: "#CDCDCD"
                  }}
                >
                  {window.location.pathname == "/updateHouseRequest"
                    ? "Update House Request"
                    : "House Request Form"}
                </h1>
                <div className="form-group">
                  <Select
                    label="City"
                    name="city"
                    onChange={this.handleChange}
                    value={account.city}
                    options={["Islamabad", "Rawalpindi"]}
                    errors={errors.city}
                  />
                  <Input
                    label="Location"
                    name="location"
                    type="text"
                    value={account.location}
                    onChange={this.handleChange}
                    errors={errors.location}
                  />
                  <Input
                    label="Area(MARLA)"
                    name="area"
                    type="Number"
                    value={account.area}
                    onChange={this.handleChange}
                    errors={errors.area}
                  />
                  <Input
                    label="Protions"
                    name="portions"
                    type="Number"
                    value={account.portions}
                    onChange={this.handleChange}
                    errors={errors.portions}
                  />
                  <Input
                    label="BedRooms"
                    name="bedRooms"
                    type="Number"
                    value={account.bedRooms}
                    onChange={this.handleChange}
                    errors={errors.bedRooms}
                  />
                  <Input
                    label="BathRooms"
                    name="baths"
                    type="Number"
                    value={account.baths}
                    onChange={this.handleChange}
                    errors={errors.baths}
                  />
                  <Input
                    label="Kitchens"
                    name="kitchens"
                    type="Number"
                    value={account.kitchens}
                    onChange={this.handleChange}
                    errors={errors.kitchens}
                  />
                  <Select
                    label="Lawn"
                    name="lawn"
                    onChange={this.handleChange}
                    value=""
                    options={["Yes", "No"]}
                    errors={errors.lawn}
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
                    label="MonthlyRent"
                    name="monthlyRent"
                    type="Number"
                    value={account.monthlyRent}
                    onChange={this.handleChange}
                    errors={errors.monthlyRent}
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

export default HouseRequestForm;
