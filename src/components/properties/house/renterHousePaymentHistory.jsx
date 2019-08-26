import React, { Component } from "react";
class RenterHousePaymentHistory extends Component {
  state = {
    payments: [],
    houseBookingId: ""
  };

  async componentDidMount() {
    const { payments, houseBookingId } = this.props.location.state;
    this.setState({ payments, houseBookingId });
    console.log(payments);
  }
  render() {
    const payments = this.state.payments;
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
                    <th scope="col">RecieveDate</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment._id}>
                      <td>{payment.currentMonth}</td>
                      <td>{payment.monthlyRent}</td>
                      <td>{payment.paymentDate}</td>
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

export default RenterHousePaymentHistory;
