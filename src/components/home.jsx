import React, { Component } from "react";
import "./contactus.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getVehicles } from "./services/vehicleService";
import authService from "./services/authService";
import { getHouses } from "./services/properties/house/houseReuestService";
import { getShops } from "./services/properties/shop/shopRequestService";
import { getTools } from "./services/tools/toolRequestService";
class Home extends Component {
  state = { vehicles: [], houses: [], shops: [], tools: [] };
  async componentDidMount() {
    let vehicles,
      houses,
      shops,
      tools = [];
    try {
      const { data: allVehicles } = await getVehicles();
      if (allVehicles) vehicles = allVehicles.slice(0, 4);
      const { data: allHouses } = await getHouses();
      if (allHouses) houses = allHouses.slice(0, 4);
      const { data: allShops } = await getShops();
      if (allShops) shops = allShops.slice(0, 4);
      const { data: allTools } = await getTools();
      if (allTools) tools = allTools.slice(0, 4);
      this.setState({ vehicles, houses, shops, tools });
    } catch (error) {
      toast.error("" + error);
    }
  }

  render() {
    const { vehicles, houses, shops, tools } = this.state;
    const user = authService.getCurrentUser();
    return (
      <React.Fragment>
        <div
          className="container-fluid"
          style={{ top: "0", background: "#E6F2F3" }}
        >
          {/* <div className="row">
            <div
              className="col-lg-12"
              style={{
                backgroundImage: `url("/background/bg.jpg")`,
                height: "400px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "relative",
                margin: "3px"
              }}
            >
              <center>
                <h1 style={{ fontFamily: "Georgia" }}>
                  {" "}
                  Welcom to Rental Services
                </h1>
              </center>
            </div>
          </div> */}
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}> Vehicles</h3>
              </center>
            </div>
          </div>
          <div
            className="row card"
            style={{
              background: "white",
              margin: "10px"
            }}
          >
            <div className="col-sm-12">
              {vehicles.map(vehicle => (
                <div key={vehicle._id} style={{ display: "inline-block" }}>
                  <img
                    src={vehicle.vehicleImages[0]}
                    style={{ margin: "4px" }}
                    className="img-responsive"
                    alt="Helpful alt text"
                    width={300}
                    height={250}
                  />
                  <h4 style={{ marginLeft: "12px" }}>
                    {vehicle.vehicleName}
                    {"  "}
                    {vehicle.vehicleModel}
                  </h4>
                  <div style={{ marginLeft: "12px" }}>
                    <Link
                      to={{
                        pathname: "/vehicleDetails",
                        state: {
                          vehicleId: vehicle._id
                        }
                      }}
                    >
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                      >
                        View Details
                      </button>
                    </Link>
                    <Link
                      to={{
                        pathname:
                          user && user.accountType === "renter"
                            ? "/vehicleRentRequestForm"
                            : "/registerUser",
                        state: {
                          vehicle: vehicle
                        }
                      }}
                    >
                      {" "}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                        disabled={
                          (user && user.accountType === "admin") ||
                          (user && user.accountType === "productowner")
                            ? true
                            : false
                        }
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}>Houses</h3>
              </center>
            </div>
          </div>
          <div
            className="row card"
            style={{ background: "white", margin: "10px" }}
          >
            <div className="col-sm-12">
              {houses.map(house => (
                <div key={house._id} style={{ display: "inline-block" }}>
                  <img
                    src={house.houseImages[0]}
                    style={{ margin: "4px" }}
                    className="img-responsive"
                    alt="Helpful alt text"
                    width={300}
                    height={250}
                  />
                  <h4 style={{ marginLeft: "12px" }}>
                    {house.city}
                    {"  "}
                    {house.location}
                  </h4>
                  <div style={{ marginLeft: "12px" }}>
                    <Link
                      to={{
                        pathname: "/houseDetails",
                        state: {
                          houseId: house._id
                        }
                      }}
                    >
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                      >
                        View Details
                      </button>
                    </Link>
                    <Link
                      to={{
                        pathname:
                          user && user.accountType === "renter"
                            ? "/houseRentRequestForm"
                            : "/registerUser",
                        state: {
                          house: house
                        }
                      }}
                    >
                      {" "}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                        disabled={
                          (user && user.accountType === "admin") ||
                          (user && user.accountType === "productowner")
                            ? true
                            : false
                        }
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}>Shops</h3>
              </center>
            </div>
          </div>
          <div
            className="row card"
            style={{ background: "white", margin: "10px" }}
          >
            <div className="col-sm-12">
              {shops.map(shop => (
                <div key={shop._id} style={{ display: "inline-block" }}>
                  <img
                    src={shop.shopImages[0]}
                    style={{ margin: "4px" }}
                    className="img-responsive"
                    alt="Helpful alt text"
                    width={300}
                    height={250}
                  />
                  <h4 style={{ marginLeft: "12px" }}>
                    {shop.city}
                    {"  "}
                    {shop.location}
                  </h4>
                  <div style={{ marginLeft: "12px" }}>
                    <Link
                      to={{
                        pathname: "/shopDetails",
                        state: {
                          shopId: shop._id
                        }
                      }}
                    >
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                      >
                        View Details
                      </button>
                    </Link>
                    <Link
                      to={{
                        pathname:
                          user && user.accountType === "renter"
                            ? "/shopRentRequestForm"
                            : "/registerUser",
                        state: {
                          shop: shop
                        }
                      }}
                    >
                      {" "}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                        disabled={
                          (user && user.accountType === "admin") ||
                          (user && user.accountType === "productowner")
                            ? true
                            : false
                        }
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}> Tools</h3>
              </center>
            </div>
          </div>
          <div
            className="row card"
            style={{ background: "white", margin: "10px" }}
          >
            <div className="col-sm-12">
              {tools.map(tool => (
                <div key={tool._id} style={{ display: "inline-block" }}>
                  <img
                    src={tool.toolImages[0]}
                    style={{ margin: "4px" }}
                    className="img-responsive"
                    alt="Helpful alt text"
                    width={300}
                    height={250}
                  />
                  <h4 style={{ marginLeft: "12px" }}>{tool.toolName}</h4>
                  <div style={{ marginLeft: "12px" }}>
                    <Link
                      to={{
                        pathname: "/toolDetails",
                        state: {
                          toolId: tool._id
                        }
                      }}
                    >
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                      >
                        View Details
                      </button>
                    </Link>
                    <Link
                      to={{
                        pathname:
                          user && user.accountType === "renter"
                            ? "/toolRentRequestForm"
                            : "/registerUser",
                        state: {
                          tool: tool
                        }
                      }}
                    >
                      {" "}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ margin: "2px" }}
                        disabled={
                          (user && user.accountType === "admin") ||
                          (user && user.accountType === "productowner")
                            ? true
                            : false
                        }
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}>Our Services</h3>
              </center>
            </div>
          </div>
          <div
            className="row card"
            style={{
              height: "250px",
              margin: "10px",
              background: "white"
            }}
          >
            <div className="col-sm-12">
              <div className="row">
                <div
                  className="col-sm-3"
                  style={{
                    // border: "1px solid black",
                    height: "195px"
                  }}
                >
                  <b> Vehicles</b>
                </div>
                <div
                  className="col-sm-3"
                  style={{
                    // border: "1px solid black",
                    height: "195px"
                  }}
                >
                  <b>Houses</b>
                </div>
                <div
                  className="col-sm-3"
                  style={{
                    // border: "1px solid black",
                    height: "195px"
                  }}
                >
                  <b>Shops</b>
                </div>
                <div
                  className="col-sm-3"
                  style={{
                    // border: "1px solid black",
                    height: "195px"
                  }}
                >
                  <b>Tools</b>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}> About us</h3>
              </center>
            </div>
          </div>
          <div
            className="row card"
            style={{
              height: "300px",
              margin: "10px",
              background: "white"
            }}
          >
            <div className="col-sm-3">
              <h3>Islamabad Office</h3>
              <p>
                407 4th Floor,
                <br /> Imperial Square ,<br /> 6 Markaz,
                <br /> Islamabad
                <br /> Pakistan <br />
                <b>Email </b> onlinerentalservices@gmail.com
                <br />
                <b>Land Line</b> +92 307 546 2469
              </p>
            </div>
            <div className="col-sm-3">
              <h3>Lahore Office</h3>
              <p>
                407 4th Floor,
                <br /> Sirfaraz Rafiqi Road,
                <br />
                Lahore Cantt,
                <br /> Lahore
                <br /> Pakistan <br />
                <b>Email </b> onlinerentalservices@gmail.com
                <br />
                <b>Land Line</b> +92 307 546 2469
              </p>
            </div>
            <div className="col-sm-3">
              <h3>Karachi Office</h3>
              <p>
                Sydney Plaza,
                <br /> Near Anbala Bakery,
                <br /> Mehmodabad,
                <br /> Karachi
                <br /> Pakistan <br />
                <b>Email </b> onlinerentalservices@gmail.com
                <br />
                <b>Land Line</b> +92 307 546 2469
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
