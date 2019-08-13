import React, { Component } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import {
  approvedShopRentRequest,
  sendEmail
} from "../../services/properties/shop/shopBookingService";
import Input from "./../../common/input";
import TextArea from "./../../common/textArea";
import Select from "./../../common/select";
class ShopRentRequestDetails extends Component {
  state = {
    account: {
      receipent: "",
      subject: "",
      emailMessage: ""
    },
    errors: [],
    shopRentRequest: {},
    renter: {},
    shop: {},
    shopOwner: {},
    shopImage: "",
    shopImages: []
  };
  schema = {
    receipent: Joi.string()
      .email()
      .max(255)
      .required(),
    subject: Joi.string()
      .min(2)
      .max(255)
      .required(),
    emailMessage: Joi.string().required()
  };
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
  componentDidMount() {
    const { shopRentRequest } = this.props.location.state;
    const renter = shopRentRequest.renter;
    const shop = shopRentRequest.shop;
    const shopOwner = shopRentRequest.owner;
    const shopImage = shopRentRequest.shop.shopImages[0];
    const shopImages = shopRentRequest.shop.shopImages;
    this.setState({
      shopRentRequest,
      renter,
      shopImage,
      shopImages,
      shop,
      shopOwner
    });
    const account = { ...this.state.account };
    account.receipent = renter.email;
    this.setState({ account });
  }
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
    const isConfirm = window.confirm("Do you Want to send Email?");
    if (isConfirm) {
      try {
        const emailData = this.state.account;
        const { data: result } = await sendEmail(emailData);
        if (result) toast.success("Email send successfuly");
      } catch (error) {
        toast.error(error + "");
      }
    }
  };
  handleApprovedRequest = async requestId => {
    const isConfirm = window.confirm("Do you Want to Approved Request?");
    if (isConfirm) {
      try {
        const { data: result } = await approvedShopRentRequest(requestId);
        if (result) {
          toast.success("Request Approved successfuly");
          //   setTimeout(() => {
          //     window.location.href = "/houseRentRequests";
          //   }, 1800);
        }
      } catch (error) {
        toast.error(error + "");
      }
    }
  };
  handleImage = image => {
    this.setState({ shopImage: image });
  };
  render() {
    const {
      shopRentRequest,
      renter,
      shop,
      shopOwner,
      shopImage,
      shopImages,
      account,
      errors
    } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <div
            className="row"
            style={{ padding: "4px", border: "1px solid black" }}
          >
            <div className="col-md-6">
              <center>
                {" "}
                <h3>Shop Request Details</h3>
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
                    <th>ShopOwner</th>
                    <td>
                      <Link
                        to={{
                          pathname: "/productOwnerDetails",
                          state: {
                            productOwnerId: shopOwner._id
                          }
                        }}
                      >
                        {shopOwner.fullName}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>Requester Name</th>
                    <td>
                      <Link
                        to={{
                          pathname: "/renterDetails",
                          state: {
                            renterId: renter._id
                          }
                        }}
                      >
                        {renter.fullName}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>StartDate</th>
                    <td> {shopRentRequest.startDate}</td>
                  </tr>
                  <tr>
                    <th>EndDate</th>
                    <td> {shopRentRequest.endDate}</td>
                  </tr>

                  <tr>
                    <th>Request-Status</th>
                    <td>{shopRentRequest.status}</td>
                  </tr>
                  <tr>
                    <th>RequestDate</th>
                    <td>{shopRentRequest.requestDate}</td>
                  </tr>
                  <tr>
                    <th>RequestTime</th>
                    <td>{shopRentRequest.requestTime}</td>
                  </tr>
                </thead>
              </table>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.handleApprovedRequest(shopRentRequest._id);
                }}
              >
                Approved Request
              </button>
              <form
                onSubmit={this.handleSubmit}
                style={{
                  padding: "4px",
                  backgroundColor: "#E6F2F3",
                  marginTop: "10px"
                }}
              >
                <Input
                  label="Email Address"
                  name="receipent"
                  type="email"
                  value={account.receipent}
                  onChange={this.handleChange}
                  errors={errors.receipent}
                  pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})*$"
                  placeholder="someone@gmail.com"
                  color="black"
                />
                <Select
                  label="Subject"
                  name="subject"
                  onChange={this.handleChange}
                  value={account.subject}
                  options={[
                    "Your Request Approved",
                    "Your Request Not-Approved!"
                  ]}
                  errors={errors.subject}
                  color="black"
                />
                <TextArea
                  label="Email Message"
                  name="emailMessage"
                  type="text"
                  value={account.emailMessage}
                  onChange={this.handleChange}
                  errors={errors.emailMessage}
                  placeholder="Email Message..."
                  color="black"
                />
                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  // onClick={() => {
                  //   this.handleApproved(houseRequest._id);
                  // }}
                  // disabled={account.emailMessage ? false : true}
                >
                  Send
                </button>
              </form>
              <div />
            </div>
            <div className="col-md-4" style={{ marginTop: "65px" }}>
              <img
                src={shopImage}
                style={{ height: "400px", width: "500px" }}
              />
              <br />
              <br />
              {shopRentRequest &&
                shopImages.map(image => (
                  <img
                    src={image}
                    style={{ height: "50px", width: "50px", margin: "8px" }}
                    onClick={() => {
                      this.handleImage(image);
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShopRentRequestDetails;
