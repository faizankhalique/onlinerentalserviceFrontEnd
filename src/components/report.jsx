import React, { Component } from "react";
import { getProductsData, getAllMonthsPrfits } from "./services/reportService";
import { toast } from "react-toastify";
import Graph from "./graph";
class Report extends Component {
  state = { productsData: {}, totalProfit: "", allMonthsProfits: [] };
  async componentDidMount() {
    try {
      const { data: productsData } = await getProductsData();
      if (productsData) {
        this.setState({ productsData });
        // const { data: response } = await getAllMonthsPrfits();
        // if (response) {
        //   const { allMonthsProfits, totalProfit } = response;
        // this.setState({ productsData, allMonthsProfits, totalProfit });
        // }
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
    // const { allMonthsProfits } = this.state.allMonthsProfits;
    return (
      <React.Fragment>
        <div className="container-fluid" style={{ background: "#E6F2F3" }}>
          <div className="row">
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "150px",
                margin: "20px 0px 15px 85px"
              }}
            >
              <b style={{ fontFamily: "Book Antiqua" }}>
                TotalVehicles: {totalVehicles}
              </b>
              <br />
              <b style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}>
                VehiclesOnRent: {totalVehiclesOnRent}
              </b>
              <br />
              <b style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}>
                FreeVehicles: {totalVehiclesFree}
              </b>
            </div>
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "150px",
                margin: "20px 0px 15px 50px"
              }}
            >
              <b style={{ fontFamily: "Book Antiqua" }}>
                TotalHouses: {totalHouses}
              </b>
              <br />
              <b style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}>
                HousesOnRent: {totalHousesOnRent}
              </b>
              <br />
              <b style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}>
                FreeHouses: {totalHousesFree}
              </b>
            </div>
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "150px",
                margin: "20px 0px 15px 50px"
              }}
            >
              <b style={{ fontFamily: "Book Antiqua" }}>
                TotalShops: {totalShops}
              </b>
              <br />
              <b style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}>
                ShopsOnRent: {totalShopsOnRent}
              </b>
              <br />
              <b style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}>
                FreeShops: {totalShopsFree}
              </b>
            </div>
            <div
              className="col-sm-2"
              style={{
                background: "white",
                height: "150px",
                margin: "20px 0px 15px 50px"
              }}
            >
              <b style={{ fontFamily: "Book Antiqua" }}>
                TotalTools: {totalTools}
              </b>
              <br />
              <b style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}>
                ToolsOnRent: {totalToolsOnRent}
              </b>
              <br />
              <b style={{ fontFamily: "Book Antiqua", marginTop: "10px" }}>
                FreeTools: {totalToolsFree}
              </b>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Graph />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Report;
