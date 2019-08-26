import React, { Component } from "react";
import { getProductsData, getAllMonthsPrfits } from "./services/reportService";
import { toast } from "react-toastify";
import Graph from "./graph";
import { Link } from "react-router-dom";
class Report extends Component {
  state = {
    productsData: {},
    totalProfit: "",
    allMonthsProfits: [],
    vehiclesProfit: "",
    housesProfit: "",
    shopsProfit: "",
    toolsProfit: ""
  };
  async componentDidMount() {
    try {
      const { data: productsData } = await getProductsData();
      if (productsData) {
        // this.setState({ productsData });
        const { data: response } = await getAllMonthsPrfits();
        if (response) {
          const {
            allMonthsProfits,
            totalProfit,
            vehiclesProfit,
            housesProfit,
            shopsProfit,
            toolsProfit
          } = response;
          this.setState({
            productsData,
            allMonthsProfits,
            totalProfit,
            vehiclesProfit,
            housesProfit,
            shopsProfit,
            toolsProfit
          });
          console.log(this.state);
        }
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  render() {
    const {
      totalVehicles,
      totalVehiclesOnRent,
      totalVehiclesFree,
      totalHouses,
      totalHousesOnRent,
      totalHousesFree,
      totalShops,
      totalShopsOnRent,
      totalShopsFree,
      totalTools,
      totalToolsOnRent,
      totalToolsFree
    } = this.state.productsData;
    const {
      vehiclesProfit,
      housesProfit,
      shopsProfit,
      toolsProfit
    } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid" style={{ background: "#E6F2F3" }}>
          <div className="row" style={{ marginTop: "8px" }}>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to="#">Vehicles</Link>
                  </h4>
                  <p className="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      Total: {totalVehicles}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      OnRent: {totalVehiclesOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Free: {totalVehiclesFree}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Revenue: {vehiclesProfit}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to="#">Houses</Link>
                  </h4>
                  <p className="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      Total: {totalHouses}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      OnRent: {totalHousesOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Free: {totalHousesFree}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Revenue: {housesProfit}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to="#">Shops</Link>
                  </h4>
                  <p className="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      Total: {totalShops}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      OnRent: {totalShopsOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Free: {totalShopsFree}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Revenue: {shopsProfit}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-70">
                <div className="card-body">
                  <h4 className="card-title">
                    <Link to="#">Tools</Link>
                  </h4>
                  <p className="card-text">
                    <b style={{ fontFamily: "Book Antiqua" }}>
                      Total: {totalTools}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      OnRent: {totalToolsOnRent}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Free: {totalToolsFree}
                    </b>
                    <br />
                    <b
                      style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}
                    >
                      Revenue: {toolsProfit}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <Graph />
            </div>
          </div>
          {/* <--------------------------> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Report;
