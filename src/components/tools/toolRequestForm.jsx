import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import authService from "../services/authService";
import Input from "../common/input";
import Select from "../common/select";
import TextArea from "../common/textArea";
import UploadFiles from "./../common/uploadFiles";
import {
  addToolRequest,
  updateToolRequest
} from "../services/tools/toolRequestService";
class ToolRequestForm extends Component {
  state = {
    account: {
      requester: "",
      toolName: "",
      company: "",
      description: "",
      dailyRent: "",
      memberShipDuration: "",
      toolImages: []
    },
    errors: [],
    imageStatus: false,
    toolRequestId: ""
  };
  schema = {
    requester: Joi.string(),
    toolName: Joi.string()
      .min(3)
      .max(256)
      .required(),
    company: Joi.string()
      .min(3)
      .max(256)
      .required(),
    description: Joi.string()
      .min(3)
      .max(256)
      .required(),
    dailyRent: Joi.number()
      .min(1)
      .required(),
    memberShipDuration: Joi.string().required(),
    toolImages: Joi.array().required()
  };
  componentDidMount() {
    if (window.location.pathname == "/updateToolRequest") {
      const { toolRequest } = this.props.location.state;
      const account = {
        requester: toolRequest.requester._id,
        toolName: toolRequest.toolName,
        company: toolRequest.company,
        description: toolRequest.description,
        dailyRent: toolRequest.dailyRent,
        memberShipDuration: toolRequest.memberShipDuration,
        toolImages: toolRequest.toolImages
      };
      this.setState({
        account,
        imageStatus: true,
        toolRequestId: toolRequest._id
      });
    } else {
      const user = authService.getCurrentUser();
      const { account } = { ...this.state };
      account.requester = user._id;
      this.setState({ account });
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
    if (errors) return;

    try {
      const { account: toolRequest, toolRequestId } = { ...this.state };
      if (window.location.pathname == "/updateToolRequest") {
        const { data: response } = await updateToolRequest(
          toolRequestId,
          toolRequest
        );
        if (response) {
          toast.success("Request Update Successfully");
          window.location.href = "/toolRequests";
        }
      } else {
        const { data: response } = await addToolRequest(toolRequest);
        if (response) {
          toast.success("Your Request send to Admin Successfully");
          window.location.href = "/toolRequestForm";
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("" + error.response.data);
      else toast.error("" + error);
    }
  };
  handleImageStatus = images => {
    const account = { ...this.state.account };
    account.toolImages = images;
    this.setState({ imageStatus: true, account });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form
                onSubmit={this.handleSubmit}
                className="card"
                style={{
                  background: "#13232f",
                  boxSizing: " border-box",
                  padding: "10px"
                }}
              >
                <h1
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    marginLeft: "260px",
                    color: "#CDCDCD"
                  }}
                >
                  {window.location.pathname == "/updateToolRequest"
                    ? "Update Tool Request"
                    : "Tool Request Form"}
                </h1>
                <div className="form-group">
                  <Input
                    label="ToolName"
                    name="toolName"
                    type="text"
                    value={account.toolName}
                    onChange={this.handleChange}
                    errors={errors.toolName}
                  />
                  <Input
                    label="Comapny"
                    name="company"
                    type="text"
                    value={account.company}
                    onChange={this.handleChange}
                    errors={errors.company}
                  />
                  <TextArea
                    label="Description"
                    name="description"
                    type="textarea"
                    value={account.description}
                    onChange={this.handleChange}
                    errors={errors.description}
                    placeholder=" "
                  />
                  <Select
                    label="Member-Ship"
                    name="memberShipDuration"
                    onChange={this.handleChange}
                    value={account.memberShipDuration}
                    options={["6 Months", "1 Year", "2 Years"]}
                    errors={errors.memberShipDuration}
                  />
                  <Input
                    label="DailyRent"
                    name="dailyRent"
                    type="Number"
                    value={account.dailyRent}
                    onChange={this.handleChange}
                    errors={errors.dailyRent}
                  />
                  <UploadFiles
                    filesLength={2}
                    fileSize={8.5}
                    filesType={[
                      "image/png",
                      "image/jpeg",
                      "image/gif",
                      "image/jpg"
                    ]}
                    url="productimages"
                    onImageStatus={this.handleImageStatus}
                  />
                  <button
                    style={{ marginTop: "4px" }}
                    disabled={this.state.imageStatus ? false : true}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Send Request
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

export default ToolRequestForm;
