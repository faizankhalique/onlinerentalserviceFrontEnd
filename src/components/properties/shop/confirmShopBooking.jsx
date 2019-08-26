import React, { Component } from "react";
import Input from "../../common/input";
import Joi from "joi-browser";
import diff_months from "../../../utils/diff_months";
import { toast } from "react-toastify";
import { updateShopBooking } from "../../services/properties/shop/shopBookingService";
import Select from "./../../common/select";
class ConfirmShopBooking extends Component {
  state = {
    account: {
      renterName: "",
      shopId: "",
      bookingStatus: "",
      shopLocation: "",
      startDate: "",
      endDate: "",
      totalMonths: "",
      currentMonth: "",
      monthlyRent: "",
      monthlyCommission: "",
      ownerMonthlyRent: "",
      security: ""
    },
    errors: [],
    bookingId: "",
    renterId: ""
  };
  schema = {
    renterName: Joi.string().required(),
    shopId: Joi.string().required(),
    bookingStatus: Joi.string().required(),
    shopLocation: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    totalMonths: Joi.number()
      .min(1)
      .required(),
    currentMonth: Joi.number()
      .min(1)
      .required(),
    monthlyRent: Joi.number()
      .min(0)
      .required(),
    monthlyCommission: Joi.number()
      .min(0)
      .required(),
    ownerMonthlyRent: Joi.number()
      .min(0)
      .required(),
    security: Joi.number()
      .min(0)
      .required()
  };
  componentDidMount() {
    const { shopBooking } = this.props.location.state;

    const account = this.state.account;
    account.shopLocation = shopBooking.shop.city;
    account.shopId = shopBooking.shop._id;
    account.renterName = shopBooking.renter.fullName;
    account.startDate = shopBooking.startDate;
    account.endDate = shopBooking.endDate;
    account.totalMonths = shopBooking.totalMonths;
    account.security = shopBooking.security;
    account.bookingStatus = shopBooking.bookingStatus;
    let length = shopBooking.payments.length;
    if (length > 0) {
      account.currentMonth = shopBooking.payments[length - 1].currentMonth + 1;
    } else {
      account.currentMonth = 1;
    }
    account.monthlyRent = shopBooking.shop.monthlyRent;
    account.monthlyCommission = shopBooking.shop.monthlyRent * 0.2;
    account.ownerMonthlyRent = account.monthlyRent - account.monthlyCommission;
    this.setState({
      account,
      bookingId: shopBooking._id,
      renterId: shopBooking.renter._id
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

    const { account } = this.state;
    const date1 = new Date(account.startDate + ",00:00");
    const date2 = new Date(account.endDate + ",00:00");
    if (account.bookingStatus == "Complete") {
      const confirm = window.confirm("Do you want to End Booking");
      if (confirm) {
        const currentDate = new Date(
          new Date().toLocaleDateString() + ",00:00"
        );
        if (date2 > currentDate || date2 < currentDate) {
          toast.error("Please set End date to current Date ");
          return;
        }
      } else {
        return;
      }
    }
    if (date2 > date1) {
      const totalMonths = diff_months(date2, date1);

      if (totalMonths == 0) {
        account.totalMonths = 1;
      } else {
        account.totalMonths = totalMonths;
      }
      this.setState({ account });
    } else if (date1 > date2) {
      toast.error("endDate must be greater than  startdate.");
      return;
    } else {
      account.totalMonths = 1;
      this.setState({ account });
    }
    try {
      const { account: shopBookingData, bookingId } = this.state;
      const confirm = window.confirm(
        `Monthly Rent : ${shopBookingData.monthlyRent}
         commission   : ${shopBookingData.monthlyCommission}
         OwnerRent    :${shopBookingData.ownerMonthlyRent}
         TotalMonths  :${shopBookingData.totalMonths}
         Current Month: ${shopBookingData.currentMonth},
         Security     : ${shopBookingData.security},
         Do you want to submit?`
      );
      if (confirm) {
        const { data: result } = await updateShopBooking(
          bookingId,
          shopBookingData
        );
        if (result) {
          toast.success("Booking Confirm Successfully");
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
                    label="Month"
                    name="currentMonth"
                    type="number"
                    value={account.currentMonth}
                    onChange={this.handleChange}
                    errors={errors.currentMonth}
                  />
                  <Input
                    label="MonthlyRent"
                    name="monthlyRent"
                    type="number"
                    value={account.monthlyRent}
                    onChange={this.handleChange}
                    errors={errors.monthlyRent}
                  />
                  <Select
                    label="BookingStatus"
                    name="bookingStatus"
                    onChange={this.handleChange}
                    value=""
                    options={["Continue", "Complete"]}
                    errors={errors.bookingStatus}
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
