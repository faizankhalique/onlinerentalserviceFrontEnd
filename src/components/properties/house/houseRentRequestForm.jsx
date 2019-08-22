import React, { Component } from "react";
import Joi from "joi-browser";
import diff_months from "../../../utils/diff_months";
import { toast } from "react-toastify";
import authService from "../../services/authService";
import { addHouseRentRequest } from "../../services/properties/house/houseBookingService";
import Input from "./../../common/input";
import TextArea from "./../../common/textArea";
class HouseRentRequestForm extends Component {
  state = {
    account: {
      renter: "",
      house: "",
      guests: "",
      purpose: "",
      startDate: "",
      endDate: ""
    },
    errors: [],
    houseImage: "",
    houseImages: [],
    monthlyRent: "",
    house: {}
  };
  schema = {
    renter: Joi.string(),
    house: Joi.string(),
    purpose: Joi.string().required(),
    guests: Joi.number().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  };
  componentDidMount() {
    const { house } = this.props.location.state;
    const user = authService.getCurrentUser();
    const account = { ...this.state.account };
    const houseImage = house.houseImages[0];
    const houseImages = house.houseImages;
    account.house = house._id;
    account.renter = user._id;
    this.setState({
      account,
      houseImage,
      houseImages,
      house,
      monthlyRent: house.monthlyRent
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
    let months = 0;

    if (date2 > date1) {
      months = parseInt(diff_months(date2, date1));
      if (months === 0) months = 1;
    } else if (date1 > date2) {
      toast.error("endDate must be greater than  startdate.");
      return;
    } else {
      months = 1;
    }
    try {
      const houseRentRequest = { ...this.state.account };
      const confirm = window.confirm(
        `your total months are ${months} and Rent per Month will ${monthlyRent} . Do you want to submit request?`
      );
      if (confirm) {
        const response = await addHouseRentRequest(houseRentRequest);
        if (response) {
          toast.success("Your request send to Admin Successfully");
          window.location.href = "/houses";
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("" + error.response.data);
      else toast.error("" + error);
    }
  };
  handleImage = image => {
    this.setState({ houseImage: image });
  };
  render() {
    const { account, errors, houseImage, houseImages, house } = this.state;
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
                  House Rent Request Form
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
                  <Input
                    label="Guests"
                    name="guests"
                    type="number"
                    value={account.guests}
                    onChange={this.handleChange}
                    errors={errors.guests}
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
                  src={houseImage}
                  alt="xyz"
                  style={{
                    width: "550px",
                    height: "450px"
                  }}
                />
                <h4 style={{ marginLeft: "12px" }}>
                  {house.city}
                  {"  "}
                  {house.location}
                </h4>
                {house &&
                  houseImages.map(image => (
                    <img
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

export default HouseRentRequestForm;
