import React, { Component } from "react";
import Input from "./../../common/input";
import Joi from "joi-browser";
import { getRenterShopBooking } from "../../services/properties/shop/shopBookingService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  addShopPayment,
  getRenterShopPayment
} from "../../services/allRegisterRenters";
class ShopPayments extends Component {
  state = {
    account: {
      rent: "",
      security: "",
      commission: "",
      month: ""
    },
    errors: [],
    shopBooking: {},
    shopImage: "",
    shopImages: [],
    shop: {},
    rents: [],
    renterId: "",
    shopPaymentId: ""
  };
  schema = {
    rent: Joi.number()
      .min(0)
      .required(),
    month: Joi.number()
      .min(0)
      .required(),
    security: Joi.number()
      .min(0)
      .required(),
    commission: Joi.number()
      .min(0)
      .required()
  };
  async componentDidMount() {
    try {
      const {
        renterId,
        shopPaymentId,
        shopBookingId,
        security
      } = this.props.location.state;
      const { data: shopBooking } = await getRenterShopBooking(shopBookingId);
      if (shopBooking) {
        const { data: rents } = await getRenterShopPayment(renterId);
        const account = { ...this.state.account };
        const monthlyRent = shopBooking.shop.monthlyRent;
        account.security = security;
        account.rent = monthlyRent;
        account.commission = parseInt(monthlyRent * 0.2);
        if (rents && rents.length > 0) {
          // alert(rents[0].month);
          account.month = parseInt(rents[rents.length - 1].month) + 1;
        } else {
          account.month = 1;
        }
        this.setState({
          account,
          shopBooking,
          shopImage: shopBooking.shop.shopImages[0],
          shopImages: shopBooking.shop.shopImages,
          shop: shopBooking.shop,
          renterId: renterId,
          shopPaymentId,
          rents
        });
      }
    } catch (error) {
      toast.error(error + "");
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
      const { renterId, account } = this.state;
      const { data: response } = await addShopPayment(renterId, account);
      if (response) {
        toast.success("Payment add successfully");
      }
    } catch (error) {
      toast.error(error + "");
    }
  };
  handleImage = image => {
    this.setState({ shopImage: image });
  };
  render() {
    const {
      account,
      errors,
      shopImage,
      shopImages,
      shopBooking,
      shop,
      rents
    } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          {shopBooking && (
            <div className="row" style={{ padding: "4px" }}>
              <div className="col-md-6">
                <center>
                  {" "}
                  <h3>Shop Booking Details</h3>
                </center>
                <br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Shop Location</th>
                      <td>
                        <Link
                          to={{
                            pathname: "/shopDetails",
                            state: {
                              shopId: shop._id,
                              admin: true
                            }
                          }}
                        >
                          {shop.location}
                        </Link>
                      </td>
                    </tr>

                    <tr>
                      <th>StartDate</th>
                      <td> {shopBooking.startDate}</td>
                    </tr>
                    <tr>
                      <th>EndDate</th>
                      <td> {shopBooking.endDate}</td>
                    </tr>

                    <tr>
                      <th>Request-Status</th>
                      <td>{shopBooking.status}</td>
                    </tr>
                    <tr>
                      <th>RequestDate</th>
                      <td>{shopBooking.requestDate}</td>
                    </tr>
                    <tr>
                      <th>RequestTime</th>
                      <td>{shopBooking.requestTime}</td>
                    </tr>
                  </thead>
                </table>
                <div />
              </div>
              <div className="col-md-4" style={{ marginTop: "65px" }}>
                <img
                  src={shopImage}
                  style={{ height: "400px", width: "500px" }}
                />
                <br />
                <br />
                {shopBooking &&
                  shopImages.map(image => (
                    <img
                      key={image}
                      src={image}
                      style={{ height: "50px", width: "50px", margin: "8px" }}
                      onClick={() => {
                        this.handleImage(image);
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-sm-6">
              <form
                onSubmit={this.handleSubmit}
                className="card"
                style={{
                  background: "#E6F2F3",
                  boxSizing: " border-box",
                  maxWidth: "900px",
                  // marginLeft: "100px",
                  padding: "10px"
                }}
              >
                <h5
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    marginLeft: "100px"
                  }}
                >
                  shop Payment Form
                </h5>
                <div className="form-group">
                  <Input
                    label="Security"
                    name="security"
                    type="number"
                    value={account.security}
                    onChange={this.handleChange}
                    errors={errors.security}
                    color="black"
                  />
                  <Input
                    label="Month No"
                    name="month"
                    type="number"
                    value={account.month}
                    onChange={this.handleChange}
                    errors={errors.month}
                    color="black"
                  />
                  <Input
                    label="Rent"
                    name="rent"
                    type="number"
                    value={account.rent}
                    onChange={this.handleChange}
                    errors={errors.rent}
                    color="black"
                  />

                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="col-sm-6">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Rent</th>
                    <th scope="col">Commission</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rents.map(rent => (
                    <tr key={Math.random}>
                      <td>{rent.month}</td>
                      <td>{rent.rent}</td>
                      <td>{rent.commission}</td>
                      <td>{rent.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShopPayments;
