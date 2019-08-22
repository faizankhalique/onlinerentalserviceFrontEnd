import React, { Component } from "react";
import Joi from "joi-browser";
import diff_days from "../../utils/diff_days";
import { toast } from "react-toastify";
import { addToolRentRequest } from "../services/tools/toolBookingService";
import Input from "../common/input";
import TextArea from "../common/textArea";
import authService from "../services/authService";
class ToolRentRequestForm extends Component {
  state = {
    account: {
      renter: "",
      tool: "",
      purpose: "",
      startDate: "",
      endDate: ""
    },
    errors: [],
    toolImage: "",
    toolImages: [],
    dailyRent: "",
    tool: {}
  };
  schema = {
    renter: Joi.string(),
    tool: Joi.string(),
    purpose: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  };
  componentDidMount() {
    const { tool } = this.props.location.state;
    const user = authService.getCurrentUser();
    const account = { ...this.state.account };
    const toolImage = tool.toolImages[0];
    const toolImages = tool.toolImages;
    account.tool = tool._id;
    account.renter = user._id;
    this.setState({
      account,
      toolImage,
      toolImages,
      tool,
      dailyRent: tool.dailyRent
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
    const date1 = new Date(account.startDate + ",00:00");
    const date2 = new Date(account.endDate + ",00:00");
    let days = 0;
    let totalRent = 0;
    if (date2 > date1) {
      days = parseInt(diff_days(date2, date1));
      totalRent = days * parseInt(dailyRent);
    } else if (date1 > date2) {
      toast.error("endDate must be greater than  startdate.");
      return;
    } else {
      totalRent = 1 * parseInt(dailyRent);
      days = 1;
    }
    try {
      const toolRentRequest = { ...this.state.account };
      const confirm = window.confirm(
        `your total rent will be ${totalRent} of ${days} days. Do you want to submit request?`
      );
      if (confirm) {
        const response = await addToolRentRequest(toolRentRequest);
        if (response) {
          toast.success("Your request send to Admin Successfully");
          window.location.href = "/tools";
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("" + error.response.data);
      else toast.error("" + error);
    }
  };
  handleImage = image => {
    this.setState({ toolImage: image });
  };
  render() {
    const { account, errors, toolImage, toolImages, tool } = this.state;
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
                  Tool Rent Request Form
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
                  src={toolImage}
                  alt="xyz"
                  style={{
                    width: "550px",
                    height: "450px"
                  }}
                />
                <h4 style={{ marginLeft: "12px" }}>
                  {`${tool.toolName}_ ${tool.company}`}
                </h4>
                {tool &&
                  toolImages.map(image => (
                    <img
                      key={image}
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

export default ToolRentRequestForm;
