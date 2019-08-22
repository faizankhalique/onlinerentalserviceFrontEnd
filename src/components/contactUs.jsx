import React, { Component } from "react";
import Input from "./common/input";
import TextArea from "./common/textArea";
import "./contactus.css";
class ContactUs extends Component {
  state = {};
  handleChange = () => {};
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid" style={{ backgroundColor: "#E6F2F3" }}>
          <div className="row">
            <div className="col-lg-12">
              <div id="image" />
            </div>
          </div>
          <div className="row" style={{ backgroundColor: "white" }}>
            <div className="col-sm-4">
              <form
                onSubmit={this.handleSubmit}
                style={{ backgroundColor: "white" }}
              >
                <div className="form-group">
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    color="black"
                    value={""}
                    onChange={this.handleChange}
                    errors={""}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    color="black"
                    value={""}
                    onChange={this.handleChange}
                    errors={""}
                  />
                  <Input
                    label="Phone"
                    name="phoneNo"
                    type="text"
                    color="black"
                    value={""}
                    onChange={this.handleChange}
                    errors={""}
                  />
                  <TextArea
                    label="Message"
                    name="message"
                    type="text"
                    value={""}
                    onChange={this.handleChange}
                    errors={""}
                    placeholder=" "
                  />
                  <button
                    style={{ marginTop: "4px" }}
                    type="submit"
                    className="btn btn-info form-control"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="col-sm-2">
              <h3>Islamabad Office</h3>
              <p>
                407 4th Floor,
                <br /> Imperial Square ,<br /> 6 Markaz,
                <br /> Islamabad
                <br /> Pakistan <br />
                <b>Email </b> bookings@rentcars247.com
                <br />
                <b>Land Line</b> +92 300 855 7698
              </p>
            </div>
            <div className="col-sm-2">
              <h3>Lahore Office</h3>
              <p>
                407 4th Floor,
                <br /> Sirfaraz Rafiqi Road,
                <br />
                Lahore Cantt,
                <br /> Lahore
                <br /> Pakistan <br />
                <b>Email </b> bookings@rentcars247.com
                <br />
                <b>Land Line</b> +92 300 855 7698
              </p>
            </div>
            <div className="col-sm-2">
              <h3>Karachi Office</h3>
              <p>
                Sydney Plaza,
                <br /> Near Anbala Bakery, ,<br /> Mehmodabad,
                <br /> Karachi
                <br /> Pakistan <br />
                <b>Email </b> bookings@rentcars247.com
                <br />
                <b>Land Line</b> +92 300 855 7698
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ContactUs;
