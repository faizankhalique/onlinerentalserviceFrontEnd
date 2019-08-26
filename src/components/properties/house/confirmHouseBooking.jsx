import React, { Component } from "react";
import Input from "../../common/input";
import Joi from "joi-browser";
import diff_months from "../../../utils/diff_months";
import { toast } from "react-toastify";
import { updateHouseBooking } from "../../services/properties/house/houseBookingService";
import Select from "./../../common/select";
class ConfirmHouseBooking extends Component {
  state = {
    account: {
      renterName: "",
      houseId: "",
      bookingStatus: "",
      houseLocation: "",
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
    houseId: Joi.string().required(),
    bookingStatus: Joi.string().required(),
    houseLocation: Joi.string().required(),
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
    const { houseBooking } = this.props.location.state;
    console.log(houseBooking);
    const account = this.state.account;
    account.houseLocation = houseBooking.house.city;
    account.houseId = houseBooking.house._id;
    account.renterName = houseBooking.renter.fullName;
    account.startDate = houseBooking.startDate;
    account.endDate = houseBooking.endDate;
    account.bookingStatus = houseBooking.bookingStatus;
    account.totalMonths = houseBooking.totalMonths;
    account.security = houseBooking.security;
    let length = houseBooking.payments.length;
    if (length > 0) {
      account.currentMonth = houseBooking.payments[length - 1].currentMonth + 1;
    } else {
      account.currentMonth = 1;
    }
    account.monthlyRent = houseBooking.house.monthlyRent;
    account.monthlyCommission = houseBooking.house.monthlyRent * 0.2;
    account.ownerMonthlyRent = account.monthlyRent - account.monthlyCommission;
    this.setState({
      account,
      bookingId: houseBooking._id,
      renterId: houseBooking.renter._id
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
      console.log("totalMonths", totalMonths);
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
      const { account: houseBookingData, bookingId } = this.state;
      const confirm = window.confirm(
        `Monthly Rent : ${houseBookingData.monthlyRent}
         commission   : ${houseBookingData.monthlyCommission}
         OwnerRent    :${houseBookingData.ownerMonthlyRent}
         TotalMonths  :${houseBookingData.totalMonths}
         Current Month: ${houseBookingData.currentMonth},
         Security     : ${houseBookingData.security},
         Do you want to submit?`
      );
      if (confirm) {
        const { data: result } = await updateHouseBooking(
          bookingId,
          houseBookingData
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
                  Confirm House Booking Form
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
                    label="HouseLocation"
                    name="houseLocation"
                    type="text"
                    value={account.houseLocation}
                    onChange={this.handleChange}
                    errors={errors.houseLocation}
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

export default ConfirmHouseBooking;
