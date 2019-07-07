import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import auth from "./services/authService";
import { toast } from "react-toastify";
// import RadioButton from "./common/radioButton";
class Login extends Component {
  state = {
    account: { email: "", password: "" },
    errors: []
  };
  schema = {
    email: Joi.string()
      .email()
      .min(2)
      .max(255)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
    // accountType: Joi.string().required()
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
      const status = await auth.loginUser(user);
      if (status) {
        toast.success("login-succeessfully");
        window.location = "/";
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(`Error :400 ${error.response.data}`);
        const errors = { ...this.state.errors };
        error.response.data === "Invalid Email"
          ? (errors.email = "Invalid Email")
          : (errors.password = "Invalid Password");
        this.setState({ errors });
      } else if (error.response && error.response.status === 404)
        toast.error(`Error :404 ${error.response.data}`);
      else toast.error(`${error}`);
    }
  };
  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <div className="modal fade" id="login">
          <div className="modal-dialog">
            {/* modal header */}
            <div
              className="modal-content"
              style={{
                background: "#13232f"
              }}
            >
              <div className="modal-header">
                <h5
                  style={{ color: "#cdcdcd" }}
                  className="modal-title"
                  id="login"
                >
                  <i className="fa fa-sign-in" aria-hidden="true" />
                  Log-in
                </h5>
                {/* button for close modal */}
                <button
                  type="rest"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {/* modal body what your content */}
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <Input
                      label="Eamil"
                      name="email"
                      type="email"
                      value={account.email}
                      onChange={this.handleChange}
                      errors={errors.email}
                    />
                    <Input
                      label="password"
                      name="password"
                      type="password"
                      value={account.password}
                      onChange={this.handleChange}
                      errors={errors.password}
                    />
                    {/* <RadioButton
                      label="Log-in As"
                      onChange={this.handleChange}
                      name={"accountType"}
                      option1="ProductOwner"
                      option2="Renter"
                      option3="Admin"
                      errors={errors.accountType}
                    /> */}
                  </div>
                  {/* modal footer */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
