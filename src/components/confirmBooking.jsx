import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import diff_days from "../utils/diff_days";
import { toast } from "react-toastify";
import { updateVehiclesBookings } from "./services/vehicleBookingService";
import { addVehiclesBooking } from "./services/allRegisterRenters";
class ConfirmBooking extends Component {
  state = {
    account: {
      renterName: "",
      vehicleName: "",
      startDate: "",
      endDate: "",
      rent: "",
      security: "",
      commission: ""
    },
    errors: [],
    bookingId: "",
    renterId: "",
    totalDays: "",

    vehicleRent: "",
    vehiclesBooking: {}
  };
  schema = {
    renterName: Joi.string().required(),
    vehicleName: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    rent: Joi.number().min(0),
    security: Joi.number()
      .min(0)
      .required(),
    commission: Joi.number().min(0)
  };
  componentDidMount() {
    const { vehiclesBooking } = this.props.location.state;
    const account = this.state.account;
    (account.vehicleName = vehiclesBooking.vehicle.vehicleName),
      (account.renterName = vehiclesBooking.renter.fullName),
      (account.startDate = vehiclesBooking.startDate);
    account.endDate = vehiclesBooking.endDate;
    account.security = vehiclesBooking.security;
    account.commission = vehiclesBooking.commission;

    this.setState({
      account,
      bookingId: vehiclesBooking._id,
      renterId: vehiclesBooking.renter._id,
      vehicleRent: vehiclesBooking.vehicle.vehicleRent,
      vehiclesBooking
    });
    this.calculateRent(
      account.endDate,
      account.startDate,
      vehiclesBooking.vehicle.vehicleRent
    );
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

  calculateRent = (EndDate, StartDate, vehicleRent) => {
    const endDate = new Date(EndDate + ",00:00");
    const startDate = new Date(StartDate + ",00:00");
    if (endDate > startDate) {
      const totalDays = diff_days(endDate, startDate) + 1;
      const totalRent = totalDays * vehicleRent;
      const commission = parseInt(totalRent * 0.2);
      const account = this.state.account;
      account.rent = totalRent;
      account.commission = commission;
      this.setState({ account, totalDays: totalDays });
    } else {
      const totalDays = 1;
      const totalRent = totalDays * vehicleRent;
      const commission = parseInt(totalRent * 0.2);
      const account = this.state.account;
      account.rent = totalRent;
      account.commission = commission;
      this.setState({
        totalDays,
        account
      });
    }
  };
  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log("errors", errors);
    if (errors) return;

    const { account, vehicleRent } = this.state;
    const startDate = new Date(account.startDate + ",00:00");
    const endDate = new Date(account.endDate + ",00:00");
    if (endDate < startDate) {
      toast.error("endDate must be greater than  startdate.");
      return;
    }

    this.calculateRent(account.endDate, account.startDate, vehicleRent);
    const totalDays = diff_days(endDate, startDate) + 1;
    const { account: bookingData, bookingId, renterId } = this.state;
    try {
      const confirm = window.confirm(
        `Total Days :${totalDays}
         Total Rent :${bookingData.rent}
         Commission :${bookingData.commission}
         Do you want to submit?`
      );
      if (confirm) {
        const { data: result } = await updateVehiclesBookings(
          bookingId,
          bookingData
        );
        if (result) {
          toast.success("Booking Confirm Successfully");
          const { data: result2 } = await addVehiclesBooking({
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
    const { account, errors, totalDays, vehicleRent } = this.state;
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
              <b> Total Days:{totalDays}</b>
            </div>
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "120px",
                margin: "20px 0px 15px 50px"
              }}
            >
              <b> Rent Per Day:{vehicleRent}</b>
            </div>
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "120px",
                margin: "20px 0px 15px 50px"
              }}
            >
              <b>Total Rent:{account.rent}</b>
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
                  Confirm Booking Form
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
                    label="VehicleName"
                    name="vehicleName"
                    type="text"
                    value={account.vehicleName}
                    onChange={this.handleChange}
                    errors={errors.vehicleName}
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

export default ConfirmBooking;
