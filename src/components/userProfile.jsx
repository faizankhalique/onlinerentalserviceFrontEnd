import React, { Component } from "react";
import authService from "./services/authService";

import ProductOwnerGroupList from "./common/productOwnerLeftNav";
class UserProfile extends Component {
  state = {};
  render() {
    const user = authService.getCurrentUser();
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
                  src={user.userImage}
                  alt="xyz"
                  style={{
                    width: "200px",
                    height: "180px",
                    borderRadius: "50%"
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
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputAddress">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                </div>
                <div class="form-group">
                  <label for="inputAddress2">Address 2</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="inputState">State</label>
                    <select id="inputState" class="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="text" class="form-control" id="inputZip" />
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label class="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
