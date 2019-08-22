import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import { getAllMonthsPrfits } from "./services/reportService";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Graph extends Component {
  state = { allMonthsProfits: [] };
  async componentDidMount() {
    const { data } = await getAllMonthsPrfits();
    const allMonthsProfits = data.allMonthsProfits;
    this.setState({ allMonthsProfits });
    console.log(allMonthsProfits);
  }
  render() {
    const { allMonthsProfits } = this.state;
    const options = {
      title: {
        text: "Monthly Profit Chart"
      },
      data: [
        {
          type: "column",
          dataPoints: allMonthsProfits
          //  [
          //   { label: "Jan", y: 10 },
          //   { label: "Feb", y: 15 },
          //   { label: "Mar", y: 25 },
          //   { label: "Apr", y: 30 },
          //   { label: "May", y: 28 },
          //   { label: "Jun", y: 10 },
          //   { label: "Jul", y: 15 },
          //   { label: "Aug", y: 25 },
          //   { label: "Sep", y: 30 },
          //   { label: "Oct", y: 28 },
          //   { label: "Nov", y: 10 },
          //   { label: "Dec", y: 15 }
          // ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  }
}
export default Graph;
