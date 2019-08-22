import React, { Component } from "react";
import { getProductOwnerDetails } from "./services/registeredProductsService";
import { toast } from "react-toastify";
class ProductOwnerDetails extends Component {
  state = {
    productOwner: {},
    totalVehicles: "",
    vehiclesOnRent: "",
    freeVehicles: ""
  };
  async componentDidMount() {
    try {
      const { productOwnerId } = this.props.location.state;
      const { data: productOwnerDetails } = await getProductOwnerDetails(
        productOwnerId
      );
      const productOwner = productOwnerDetails.productOwner;
      const totalVehicles = productOwnerDetails.totalVehicles;
      const vehiclesOnRent = productOwnerDetails.vehiclesOnRent;
      const freeVehicles = productOwnerDetails.freeVehicles;
      this.setState({
        productOwner,
        totalVehicles,
        vehiclesOnRent,
        freeVehicles
      });
      console.log(productOwnerDetails);
    } catch (error) {
      toast.error(error + "");
    }
  }
  render() {
    const {
      productOwner,
      totalVehicles,
      vehiclesOnRent,
      freeVehicles
    } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <center>
                {" "}
                <h3>Product_Owner Details</h3>
              </center>
              <br />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <td>{productOwner.fullName}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{productOwner.email}</td>
                  </tr>
                  <tr>
                    <th>PhoneNo</th>
                    <td>{productOwner.phoneNo}</td>
                  </tr>
                  <tr>
                    <th>CnicNo</th>
                    <td>{productOwner.cnicNo}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{productOwner.address}</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>{productOwner.gender}</td>
                  </tr>
                  <tr>
                    <th>RegisteredDate</th>
                    <td>{productOwner.registeredDate}</td>
                  </tr>
                </thead>
              </table>
              <div />
            </div>
            <div className="col-md-4" style={{ marginTop: "65px" }}>
              <img
                src={productOwner.userImage}
                style={{ height: "300px", width: "300px" }}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductOwnerDetails;
