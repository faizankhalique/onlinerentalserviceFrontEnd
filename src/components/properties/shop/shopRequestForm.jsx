import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import Input from "./../../common/input";
import Select from "./../../common/select";
import UploadFiles from "./../../common/uploadFiles";
import {
  addShopRequest,
  updateShopRequest
} from "../../services/properties/shop/shopRequestService";
class ShopRequestForm extends Component {
  state = {
    account: {
      requester: "",
      city: "",
      location: "",
      area: "",
      monthlyRent: "",
      memberShipDuration: "",
      shopImages: []
    },
    errors: [],
    imageStatus: false,
    shopRequestId: ""
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
    monthlyRent: Joi.number()
      .min(1)
      .required(),
    memberShipDuration: Joi.string().required(),
    shopImages: Joi.array().required()
  };
  componentDidMount() {
    if (window.location.pathname == "/updateShopRequest") {
      const { shopRequest } = this.props.location.state;
      const account = {
        requester: shopRequest.requester._id,
        city: shopRequest.city,
        location: shopRequest.location,
        area: shopRequest.area,
        monthlyRent: shopRequest.monthlyRent,
        memberShipDuration: shopRequest.memberShipDuration,
        shopImages: shopRequest.shopImages
      };
      this.setState({
        account,
        imageStatus: true,
        shopRequestId: shopRequest._id
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
      const { account: shopRequest, shopRequestId } = { ...this.state };
      if (window.location.pathname == "/updateShopRequest") {
        const { data: response } = await updateShopRequest(
          shopRequestId,
          shopRequest
        );
        if (response) {
          toast.success("Request Update Successfully");
          window.location.href = "/shopRequests";
        }
      } else {
        const { data: response } = await addShopRequest(shopRequest);
        if (response) {
          toast.success("Your Request send to Admin Successfully");
          window.location.href = "/shopRequestForm";
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
    account.shopImages = images;
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
                  {window.location.pathname == "/updateShopRequest"
                    ? "Update Shop Request"
                    : "Shop Request Form"}
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

export default ShopRequestForm;
