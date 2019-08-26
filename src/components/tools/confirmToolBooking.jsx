import React, { Component } from "react";
import Joi from "joi-browser";
import diff_days from "../../utils/diff_days";
import { toast } from "react-toastify";
import { updateToolBooking } from "../services/tools/toolBookingService";
import { addToolBooking } from "../services/allRegisterRenters";
import Input from "./../common/input";
import Select from "./../common/select";
class ConfirmToolBooking extends Component {
  state = {
    account: {
      renterName: "",
      toolName: "",
      toolId: "",
      bookingStatus: "",
      startDate: "",
      endDate: "",
      totalRent: "",
      totalDays: "",
      security: "",
      commission: "",
      ownerRent: ""
    },
    errors: [],
    bookingId: "",
    renterId: "",
    dailyRent: ""
  };
  schema = {
    renterName: Joi.string().required(),
    toolName: Joi.string().required(),
    toolId: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    bookingStatus: Joi.string().required(),
    commission: Joi.number().min(0),
    totalRent: Joi.number().min(0),
    totalDays: Joi.number().min(1),
    ownerRent: Joi.number().min(0),
    security: Joi.number()
      .min(0)
      .required()
  };
  componentDidMount() {
    const { toolBooking } = this.props.location.state;

    const account = this.state.account;
    (account.toolName = toolBooking.tool.toolName),
      (account.toolId = toolBooking.tool._id),
      (account.renterName = toolBooking.renter.fullName),
      (account.startDate = toolBooking.startDate);
    account.endDate = toolBooking.endDate;
    account.bookingStatus = toolBooking.bookingStatus;
    account.security = toolBooking.payment.security;
    account.commission = toolBooking.payment.commission;
    account.totalRent = toolBooking.payment.totalRent;
    account.ownerRent = toolBooking.payment.ownerRent;
    account.totalDays = toolBooking.payment.totalDays;
    this.setState({
      account,
      bookingId: toolBooking._id,
      renterId: toolBooking.renter._id,
      dailyRent: toolBooking.tool.dailyRent
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
    const { account, dailyRent } = this.state;
    const startDate = new Date(account.startDate + ",00:00");
    const endDate = new Date(account.endDate + ",00:00");
    if (endDate < startDate) {
      toast.error("endDate must be greater than  startdate.");
      return;
    }

    this.calculateRent(account.endDate, account.startDate, dailyRent);
    if (account.bookingStatus == "Complete") {
      const confirm = window.confirm("Do you want to End Booking");
      if (confirm) {
        const currentDate = new Date(
          new Date().toLocaleDateString() + ",00:00"
        );
        if (endDate > currentDate || endDate < currentDate) {
          toast.error("Please set End date to current Date ");
          return;
        }
      } else {
        return;
      }
    }
    try {
      const { account: bookingData, bookingId, renterId } = this.state;
      const confirm = window.confirm(
        `Total Days :${bookingData.totalDays}
        Total Rent :${bookingData.totalRent}
        Owner Rent :${bookingData.ownerRent}
        Commission :${bookingData.commission}
        Do you want to submit?`
      );
      if (confirm) {
        const { data: result } = await updateToolBooking(
          bookingId,
          bookingData
        );
        if (result) {
          toast.success("Booking Confirm Successfully");
          setTimeout(() => {
            window.location.pathname = "/confirmToolBooking";
          }, 1500);
        }
      }
    } catch (error) {
      toast.error(error + "");
    }
  };
  calculateRent = (EndDate, StartDate, dailyRent) => {
    const endDate = new Date(EndDate + ",00:00");
    const startDate = new Date(StartDate + ",00:00");
    if (endDate > startDate) {
      const totalDays = diff_days(endDate, startDate) + 1;
      const totalRent = totalDays * dailyRent;
      const commission = parseInt(totalRent * 0.2);
      const account = this.state.account;
      account.totalRent = totalRent;
      account.commission = commission;
      account.totalDays = totalDays;
      account.ownerRent = totalRent - commission;
      this.setState({ account });
    } else {
      const totalDays = 1;
      const totalRent = totalDays * dailyRent;
      const commission = parseInt(totalRent * 0.2);
      const account = this.state.account;
      account.totalRent = totalRent;
      account.commission = commission;
      account.totalDays = totalDays;
      account.ownerRent = totalRent - commission;
      this.setState({
        account
      });
    }
  };
  render() {
    const { account, errors, dailyRent } = this.state;
    return (
      <React.Fragment>
        <div className="container" style={{ background: "#E6F2F3" }}>
          <div className="row">
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "120px",
                margin: "20px 0px 15px 85px"
              }}
            >
              <b> Total Days:{account.totalDays}</b>
            </div>
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "120px",
                margin: "20px 0px 15px 50px"
              }}
            >
              <b> Rent Per Day:{dailyRent}</b>
            </div>
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "120px",
                margin: "20px 0px 15px 50px"
              }}
            >
              <b>Total Rent:{account.totalRent}</b>
            </div>
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "120px",
                margin: "20px 0px 15px 50px"
              }}
            >
              <b>Commission:{account.commission}</b>
            </div>
          </div>
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
                  Confirm Tool Booking Form
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
                    label="ToolName"
                    name="toolName"
                    type="text"
                    value={account.toolName}
                    onChange={this.handleChange}
                    errors={errors.toolName}
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
                    value={account.totalRent}
                    onChange={this.handleChange}
                    errors={errors.totalRent}
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

export default ConfirmToolBooking;
