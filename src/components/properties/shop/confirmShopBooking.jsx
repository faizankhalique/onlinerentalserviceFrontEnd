import React, { Component } from "react";
import Input from "../../common/input";
import Joi from "joi-browser";
import diff_days from "../../../utils/diff_days";
import { toast } from "react-toastify";
import { updateShopBooking } from "../../services/properties/shop/shopBookingService";
import { addShopBooking } from "../../services/allRegisterRenters";
class ConfirmShopBooking extends Component {
  state = {
    account: {
      renterName: "",
      shopLocation: "",
      startDate: "",
      endDate: "",
      rent: "",
      security: ""
    },
    errors: [],
    bookingId: "",
    renterId: "",
    monthlyRent: ""
  };
  schema = {
    renterName: Joi.string().required(),
    shopLocation: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    rent: Joi.number().min(1),
    security: Joi.number()
      .min(1)
      .required()
  };
  componentDidMount() {
    const { shopBooking } = this.props.location.state;
    const account = this.state.account;
    (account.shopLocation = shopBooking.shop.city),
      (account.renterName = shopBooking.renter.fullName),
      (account.startDate = shopBooking.startDate);
    account.endDate = shopBooking.endDate;
    account.security = shopBooking.security;
    account.rent = shopBooking.rent;
    this.setState({
      account,
      bookingId: shopBooking._id,
      renterId: shopBooking.renter._id,
      monthlyRent: shopBooking.shop.monthlyRent
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
    const date1 = new Date(account.startDate + "," + account.startTime);
    const date2 = new Date(account.endDate + "," + account.endTime);
    if (date2 > date1) {
      const totalRent =
        parseInt(diff_days(date2, date1)) * parseInt(monthlyRent);
      account.rent = totalRent;
      this.setState({ account });
    } else if (date1 > date2) {
      toast.error("endDate must be greater than  startdate.");
      return;
    } else {
      const totalRent = 1 * parseInt(monthlyRent);
      account.rent = totalRent;
      this.setState({ account });
      // alert("Dates are equal.");
    }

    try {
      const { account: shopBookingData, bookingId, renterId } = this.state;
      const confirm = window.confirm(
        `Your Total Rent is ${
          shopBookingData.monthlyRent
        } Do you want to submit?`
      );
      if (confirm) {
        const { data: result } = await updateShopBooking(
          bookingId,
          shopBookingData
        );
        if (result) {
          toast.success("Booking Confirm Successfully");
          const { data: result2 } = await addShopBooking({
            bookingId: bookingId,
            renterId: renterId
          });
          if (result2)
            toast.success("Booking add into AllRegisterRenters Successfully");
        }
      }
    } catch (error) {
      toast.error(error + "");
    }
  };
  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 " style={{ marginLeft: "65px" }}>
              <form
                onSubmit={this.handleSubmit}
                className="card"
                style={{
                  background: "#13232f",
                  boxSizing: " border-box",
                  maxWidth: "900px",
                  // marginLeft: "100px",
                  padding: "10px"
                }}
              >
                <h1
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    color: "#CDCDCD",
                    marginLeft: "170px"
                  }}
                >
                  Confirm Shop Booking Form
                </h1>
                <div className="form-group">
                  <Input
                    label="RenterName"
                    name="renterName"
                    type="text"
                    value={account.renterName}
                    onChange={this.handleChange}
                    errors={errors.renterName}
                  />
                  <Input
                    label="ShopLocation"
                    name="shopLocation"
                    type="text"
                    value={account.shopLocation}
                    onChange={this.handleChange}
                    errors={errors.shopLocation}
                  />
                  <Input
                    label="StatDate"
                    name="startDate"
                    type="date"
                    value={account.startDate}
                    onChange={this.handleChange}
                    errors={errors.startDate}
                  />
                  <Input
                    label="endDate"
                    name="endDate"
                    type="date"
                    value={account.endDate}
                    onChange={this.handleChange}
                    errors={errors.endDate}
                  />
                  <Input
                    label="Security"
                    name="security"
                    type="number"
                    value={account.security}
                    onChange={this.handleChange}
                    errors={errors.security}
                  />
                  <Input
                    label="Rent"
                    name="rent"
                    type="number"
                    value={account.rent}
                    onChange={this.handleChange}
                    errors={errors.rent}
                  />
                  <button
                    style={{ marginTop: "4px", marginLeft: "750px" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
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

export default ConfirmShopBooking;
