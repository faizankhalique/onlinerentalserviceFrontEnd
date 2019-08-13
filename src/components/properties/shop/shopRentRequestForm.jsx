import React, { Component } from "react";
import Joi from "joi-browser";
import diff_days from "../../../utils/diff_days";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { addShopRentRequest } from "../../services/properties/shop/shopBookingService";
import Input from "./../../common/input";
import TextArea from "./../../common/textArea";
class ShopRentRequestForm extends Component {
  state = {
    account: {
      renter: "",
      shop: "",
      purpose: "",
      startDate: "",
      endDate: ""
    },
    errors: [],
    shopImage: "",
    shopImages: [],
    monthlyRent: "",
    shop: {}
  };
  schema = {
    renter: Joi.string(),
    shop: Joi.string(),
    purpose: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  };
  componentDidMount() {
    const { shop } = this.props.location.state;
    const user = authService.getCurrentUser();
    const account = { ...this.state.account };
    const shopImage = shop.shopImages[0];
    const shopImages = shop.shopImages;
    account.shop = shop._id;
    account.renter = user._id;
    this.setState({
      account,
      shopImage,
      shopImages,
      shop,
      monthlyRent: shop.monthlyRent
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
    const { account, monthlyRent } = this.state;
    const date1 = new Date(account.startDate + ",00:00");
    const date2 = new Date(account.endDate + ",00:00");
    let days = 0;
    let totalRent = 0;
    if (date2 > date1) {
      days = parseInt(diff_days(date2, date1));
      totalRent = days * parseInt(monthlyRent);
    } else if (date1 > date2) {
      toast.error("endDate must be greater than  startdate.");
      return;
    } else {
      totalRent = 1 * parseInt(monthlyRent);
      days = 1;
    }
    try {
      const shopRentRequest = { ...this.state.account };
      const confirm = window.confirm(
        `your total rent will be ${totalRent} of ${days} days. Do you want to submit request?`
      );
      if (confirm) {
        const response = await addShopRentRequest(shopRentRequest);
        if (response) {
          toast.success("Your request send to Admin Successfully");
          window.location.href = "/shops";
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("" + error.response.data);
      else toast.error("" + error);
    }
  };
  handleImage = image => {
    this.setState({ shopImage: image });
  };
  render() {
    const { account, errors, shopImage, shopImages, shop } = this.state;
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
                  Shop Rent Request Form
                </h4>
                <div className="form-group">
                  <Input
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={account.startDate}
                    onChange={this.handleChange}
                    errors={errors.startDate}
                  />
                  <Input
                    label="End Date"
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
            <div className="col-sm-6">
              <center>
                <img
                  className="rounded"
                  src={shopImage}
                  alt="xyz"
                  style={{
                    width: "550px",
                    height: "450px"
                  }}
                />
                <h4 style={{ marginLeft: "12px" }}>
                  {shop.city}
                  {"  "}
                  {shop.location}
                </h4>
                {shop &&
                  shopImages.map(image => (
                    <img
                      key={image}
                      src={image}
                      style={{ height: "50px", width: "50px", margin: "5px" }}
                      onClick={() => {
                        this.handleImage(image);
                      }}
                    />
                  ))}
              </center>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShopRentRequestForm;
