import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import RadioButton from "./common/radioButton";
import UploadFiles from "./common/uploadFiles";
import { registerUser } from "./services/userService";
import { toast } from "react-toastify";
class RegisterUser extends Component {
  state = {
    account: {
      fullName: "",
      password: "",
      cnicNo: "",
      email: "",
      gender: "",
      phoneNo: "",
      address: "",
      accountType: "",
      userImage: ""
    },
    imageStatus: false,
    errors: []
  };
  schema = {
    fullName: Joi.string()
      .min(3)
      .max(255)
      .required(),
    email: Joi.string()
      .email()
      .min(2)
      .max(255)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    gender: Joi.string().required(),
    phoneNo: Joi.string()
      .min(11)
      .max(11)
      .required(),
    cnicNo: Joi.string()
      .min(15)
      .max(15)
      .required(),
    address: Joi.string()
      .min(3)
      .max(225)
      .required(),
    accountType: Joi.string().required(),
    userImage: Joi.string().required()
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
      const user = { ...this.state.account };
      const response = await registerUser(user);
      if (response) {
        toast.success("Sign-up Successfully");
        this.props.history.replace("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("" + error.response.data);
      } else toast.error("" + error);
    }
  };
  handleImageStatus = image => {
    const account = { ...this.state.account };
    account.userImage = image;
    this.setState({ imageStatus: true, account });
  };
  render() {
    const { account, errors } = this.state;
    return (
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
                User Registration Form
              </h1>
              <div className="form-group">
                <Input
                  label="FullName"
                  name="fullName"
                  type="text"
                  value={account.fullName}
                  onChange={this.handleChange}
                  errors={errors.fullName}
                />

                <Input
                  label="Email"
                  name="email"
                  type="text"
                  value={account.email}
                  onChange={this.handleChange}
                  errors={errors.email}
                  pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})*$"
                  placeholder="someone@gmail.com"
                />
                <Input
                  label="Phone-NO"
                  name="phoneNo"
                  type="text"
                  value={account.phoneNo}
                  onChange={this.handleChange}
                  errors={errors.phoneNo}
                  pattern="03[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}"
                  placeholder="00000000000"
                />

                <Input
                  label="Address"
                  name="address"
                  type="text"
                  value={account.address}
                  onChange={this.handleChange}
                  errors={errors.address}
                />
                <Input
                  label="CNIC-NO"
                  name="cnicNo"
                  type="text"
                  value={account.cnicNo}
                  onChange={this.handleChange}
                  errors={errors.cnicNo}
                  pattern="^[0-9]{5}-[0-9]{7}-[0-9]$"
                  placeholder="00000-0000000-0"
                />
                <RadioButton
                  label="Gender"
                  onChange={this.handleChange}
                  name={"gender"}
                  option1="Male"
                  option2="Female"
                  errors={errors.gender}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={account.password}
                  onChange={this.handleChange}
                  errors={errors.password}
                />
                <RadioButton
                  label="Account-Type"
                  onChange={this.handleChange}
                  name={"accountType"}
                  option1="ProductOwner"
                  option2="Renter"
                  errors={errors.accountType}
                />
                <UploadFiles
                  filesLength={1}
                  fileSize={8.5}
                  filesType={[
                    "image/png",
                    "image/jpeg",
                    "image/gif",
                    "image/jpg"
                  ]}
                  url="userimages"
                  onImageStatus={this.handleImageStatus}
                />
                <button
                  style={{ marginTop: "4px" }}
                  disabled={this.state.imageStatus ? false : true}
                  type="submit"
                  className="btn btn-primary"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
