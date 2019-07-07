import React, { Component } from "react";
import authService from "./services/authService";

import ProductOwnerGroupList from "./common/productOwnerLeftNav";
class UserProfile extends Component {
  state = {};
  render() {
    const user = authService.getCurrentUser();
    return (
      <React.Fragment>
        <h1>User Profile</h1>
        <h1>{user.accountType}</h1>
      </React.Fragment>
    );
  }
}

export default UserProfile;
