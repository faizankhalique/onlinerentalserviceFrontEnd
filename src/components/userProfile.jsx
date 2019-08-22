import React, { Component } from "react";
import Joi from "joi-browser";
import authService from "./services/authService";
import Input from "./common/input";
import RadioButton from "./common/radioButton";
import UploadFiles from "./common/uploadFiles";
import { getUser, updateUser } from "./services/userService";
import { toast } from "react-toastify";
class UserProfile extends Component {
  state = {
    account: {
      fullName: "",
      password: "",
      cnicNo: "",
      email: "",
      gender: "",
      phoneNo: "",
      address: "",
      userImage: ""
    },
    imageStatus: true,
    errors: [],
    user: {}
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
    userImage: Joi.string().required()
  };
  async componentDidMount() {
    try {
      const currentUser = authService.getCurrentUser();
      const { data: user } = await getUser(currentUser._id);
      if (user) {
        let account = this.state.account;
        account.fullName = user.fullName;
        account.cnicNo = user.cnicNo;
        account.email = user.email;
        account.gender = user.gender;
        account.phoneNo = user.phoneNo;
        account.address = user.address;
        account.userImage = user.userImage;
        this.setState({ user: currentUser, account });
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
      const { user, account } = this.state;
      const { data: token } = await updateUser(user._id, account);
      if (token) {
        toast.success("Your Profile update Successfully Please Login");
        setTimeout(() => {
          window.location.pathname = "/logOut";
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("" + error.response.data);
      } else if (error.response && error.response.status === 404) {
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
    const { account, errors, user } = this.state;

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-sm-4"
              style={{
                width: "300px",
                height: "250px",
                // border: "1px solid black",
                backgroundColor: "#E6F2F3",
                margin: "50px 10px 0 40px"
              }}
            >
              <center>
                <br />
                <img
                  className="rounded"
                  src={user.userImage}
                  alt="xyz"
                  style={{
                    width: "200px",
                    height: "180px"
                    // borderRadius: "50%"
                  }}
                />
                <br />
                <b>{user.fullName}</b>
                <br />
                <small>{user.email}</small>
              </center>
              {/* <h1>User Profile</h1>
                <h1>{user.accountType}</h1> */}
            </div>
            <div
              className="col-sm-6"
              style={{ backgroundColor: "#E6F2F3", margin: "50px 10px 0 40px" }}
            >
              <form
                onSubmit={this.handleSubmit}
                style={{ backgroundColor: "#E6F2F3" }}
              >
                <h1
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif"
                  }}
                >
                  User Registration Form
                </h1>
                <div className="form-group">
                  <Input
                    label="FullName"
                    name="fullName"
                    type="text"
                    color="black"
                    value={account.fullName}
                    onChange={this.handleChange}
                    errors={errors.fullName}
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="text"
                    color="black"
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
                    color="black"
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
                    color="black"
                    value={account.address}
                    onChange={this.handleChange}
                    errors={errors.address}
                  />
                  <Input
                    label="CNIC-NO"
                    name="cnicNo"
                    type="text"
                    color="black"
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
                    color="black"
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    color="black"
                    value={account.password}
                    onChange={this.handleChange}
                    errors={errors.password}
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
                    color="balck"
                  />
                  <button
                    style={{ marginTop: "4px" }}
                    disabled={this.state.imageStatus ? false : true}
                    type="submit"
                    className="btn btn-info form-control"
                  >
                    Update Account
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

export default UserProfile;
