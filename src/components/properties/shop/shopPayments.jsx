import React, { Component } from "react";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { updateShopPayment } from "../../services/properties/shop/shopBookingService";

class ShopPayments extends Component {
  state = {
    payments: [],
    shopBookingId: ""
  };

  async componentDidMount() {
    const { payments, shopBookingId } = this.props.location.state;
    this.setState({ payments, shopBookingId });
  }
  handlePayment = async paymentId => {
    try {
      const confirm = window.confirm("Do you want payment to Owner?");
      if (confirm) {
        const shopBookingId = this.state.shopBookingId;
        const { data } = await updateShopPayment(shopBookingId, {
          paymentId: paymentId
        });
        if (data) {
          toast.success("payment update Successfuly");
          setTimeout(() => {
            window.location.pathname = "/shopPayments";
          }, 1500);
        }
      }
    } catch (error) {
      toast.error(error + "");
    }
  };
  render() {
    const { payments } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">MonthlyRent</th>
                    <th scope="col">Commissinon</th>
                    <th scope="col">OwnerRent</th>
                    <th scope="col">RecieveDate</th>
                    <th scope="col">PaidToOwnerStatus</th>
                    <th scope="col">PaidToOwnerDate</th>
                    {/* <th scope="col">Update</th> */}
                    <th scope="col">PeymentToOwner</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment._id}>
                      <td>{payment.currentMonth}</td>
                      <td>{payment.monthlyRent}</td>
                      <td>{payment.monthlyCommission}</td>
                      <td>{payment.ownerMonthlyRent}</td>
                      <td>{payment.paymentDate}</td>
                      <td>{payment.paidToOwnerStatus.toString()}</td>
                      <td>{payment.paidToOwnerDate}</td>
                      {/* <td>
                        <button className="btn btn-sm btn-primary">
                          Update
                        </button>
                      </td> */}
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            this.handlePayment(payment._id);
                          }}
                        >
                          PaidToOwner
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShopPayments;
