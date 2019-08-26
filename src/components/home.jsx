import React, { Component } from "react";
import "./contactus.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getVehicles } from "./services/vehicleService";
import authService from "./services/authService";
import { getHouses } from "./services/properties/house/houseReuestService";
import { getShops } from "./services/properties/shop/shopRequestService";
import { getTools } from "./services/tools/toolRequestService";
import ToolRequestForm from "./tools/toolRequestForm";
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
        <div className="container-fluid" style={{ background: "#E6F2F3" }}>
          <div className="row">
            <div className="col-lg-12">
              <center>
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide my-4"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                      <img
                        className="d-block img-fluid img-responsive"
                        src="/background/carbg1.jpg"
                        alt="First slide"
                        style={{ height: "600px", width: "1300px" }}
                      />
                      <div class="carousel-caption">
                        <h3>Wellcome To Rental Service</h3>
                        <p>We had such a great time in LA!</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block img-fluid img-responsive"
                        src="/background/housebg1.jpg"
                        alt="Second slide"
                        style={{ height: "600px", width: "1300px" }}
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block img-fluid img-responsive"
                        src="/background/bg3.jpg"
                        alt="Third slide"
                        style={{ height: "600px", width: "1300px" }}
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </center>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}> Vehicles</h3>
              </center>
            </div>
          </div>
          {/* --------------------------- */}
          <div className="row">
            {vehicles.map(vehicle => (
              <div className="col-lg-3 col-md-6 mb-4" key={vehicle._id}>
                <div className="card h-100">
                  <Link to="#">
                    <img
                      className="card-img-top"
                      src={vehicle.vehicleImages[0]}
                      alt="vechileImage"
                      style={{ height: "250px" }}
                    />
                  </Link>
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to="#">
                        {vehicle.vehicleName} {vehicle.vehicleModel}
                      </Link>
                    </h4>
                    <h5>DailyRent Rs: {vehicle.vehicleRent}</h5>
                    {/* <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Amet numquam aspernatur!
                    </p> */}
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      &#9733; &#9733; &#9733; &#9733; &#9734;
                    </small>
                    <div>
                      <Link
                        to={{
                          pathname: "/vehicleDetails",
                          state: {
                            vehicleId: vehicle._id
                          }
                        }}
                      >
                        <button
                          className="btn btn-outline-primary btn-xsm"
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
                </div>
              </div>
            ))}
          </div>
          <hr />
          {/* --------------------------------------- */}
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}> Houses</h3>
              </center>
            </div>
            {houses.map(house => (
              <div className="col-lg-3 col-md-6 mb-4" key={house._id}>
                <div className="card h-100">
                  <a href="#">
                    <img
                      className="card-img-top"
                      src={house.houseImages[0]}
                      alt="houseImage"
                      style={{ height: "250px" }}
                    />
                  </a>
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to="#">
                        {house.city} {house.loctaion}
                      </Link>
                    </h4>
                    <h5>MonthlyRent Rs: {house.monthlyRent}</h5>
                    {/* <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Amet numquam aspernatur!
                    </p> */}
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      &#9733; &#9733; &#9733; &#9733; &#9734;
                    </small>
                    <div>
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
                </div>
              </div>
            ))}
          </div>
          <hr />
          {/* --------------------------------------- */}

          {/* --------------------------------------- */}
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}> Shops</h3>
              </center>
            </div>
            {shops.map(shop => (
              <div className="col-lg-3 col-md-6 mb-4" key={shop._id}>
                <div className="card h-100">
                  <a href="#">
                    <img
                      className="card-img-top"
                      src={shop.shopImages[0]}
                      alt="houseImage"
                      style={{ height: "250px" }}
                    />
                  </a>
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to="#">
                        {shop.city} {shop.loctaion}
                      </Link>
                    </h4>
                    <h5>MonthlyRent Rs: {shop.monthlyRent}</h5>
                    {/* <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Amet numquam aspernatur!
                    </p> */}
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      &#9733; &#9733; &#9733; &#9733; &#9734;
                    </small>
                    <div>
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
                </div>
              </div>
            ))}
          </div>
          <hr />
          {/* --------------------------------------- */}
          {/* --------------------------------------- */}
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}> Tools</h3>
              </center>
            </div>
            {tools.map(tool => (
              <div className="col-lg-3 col-md-6 mb-4" key={tool._id}>
                <div className="card h-100">
                  <a href="#">
                    <img
                      className="card-img-top"
                      src={tool.toolImages[0]}
                      alt="toolImage"
                      style={{ height: "250px" }}
                    />
                  </a>
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to="#">
                        {tool.city} {tool.toolName}
                      </Link>
                    </h4>
                    <h5>DailyRent Rs: {tool.dailyRent}</h5>
                    {/* <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Amet numquam aspernatur!
                    </p> */}
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      &#9733; &#9733; &#9733; &#9733; &#9734;
                    </small>
                    <div>
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
                </div>
              </div>
            ))}
          </div>
          <hr />
          {/* --------------------------------------- */}
          <div className="col-sm-12">
            <center>
              <h3 style={{ fontFamily: "Georgia" }}> Our Services</h3>
            </center>
          </div>
          <div className="row">
            <div className="col-md-7">
              <a href="#">
                <img
                  className="img-fluid rounded mb-3 mb-md-0"
                  src="/background/carservice.jpg"
                  alt="vehicleImage"
                  style={{ height: "450px", width: "700px" }}
                />
              </a>
            </div>
            <div className="col-md-5">
              <h3>Vehicles</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium veniam exercitationem expedita laborum at voluptate.
                Labore, voluptates totam at aut nemo deserunt rem magni pariatur
                quos perspiciatis atque eveniet unde. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Laudantium veniam
                exercitationem expedita laborum at voluptate. Labore, voluptates
                totam at aut nemo deserunt rem magni pariatur quos perspiciatis
                atque eveniet unde. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Laudantium veniam exercitationem expedita
                laborum at voluptate. Labore, voluptates totam at aut nemo
                deserunt rem magni pariatur quos perspiciatis atque eveniet
                unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium veniam exercitationem expedita laborum at voluptate.
                Labore, voluptates totam at aut nemo deserunt rem magni pariatur
                quos perspiciatis atque eveniet unde. Laudantium veniam
                exercitationem expedita laborum at voluptate. Labore,
                voluptates.
              </p>
              <Link className="btn btn-primary" to="/vehicles">
                View Vehicles
              </Link>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-7">
              <a href="#">
                <img
                  className="img-fluid rounded mb-3 mb-md-0"
                  src="/background/houseservice1.jpg"
                  alt="houseImage"
                  style={{ height: "450px", width: "700px" }}
                />
              </a>
            </div>
            <div className="col-md-5">
              <h3>Houses</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium veniam exercitationem expedita laborum at voluptate.
                Labore, voluptates totam at aut nemo deserunt rem magni pariatur
                quos perspiciatis atque eveniet unde. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Laudantium veniam
                exercitationem expedita laborum at voluptate. Labore, voluptates
                totam at aut nemo deserunt rem magni pariatur quos perspiciatis
                atque eveniet unde. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Laudantium veniam exercitationem expedita
                laborum at voluptate. Labore, voluptates totam at aut nemo
                deserunt rem magni pariatur quos perspiciatis atque eveniet
                unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium veniam exercitationem expedita laborum at voluptate.
                Labore, voluptates totam at aut nemo deserunt rem magni pariatur
                quos perspiciatis atque eveniet unde. Laudantium veniam
                exercitationem expedita laborum at voluptate. Labore,
                voluptates.
              </p>
              <Link className="btn btn-primary" to="/houses">
                View Houses
              </Link>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-7">
              <a href="#">
                <img
                  className="img-fluid rounded mb-3 mb-md-0"
                  src="/background/shopservice.jpg"
                  alt="shopImage"
                  style={{ height: "450px", width: "700px" }}
                />
              </a>
            </div>
            <div className="col-md-5">
              <h3>Shops</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium veniam exercitationem expedita laborum at voluptate.
                Labore, voluptates totam at aut nemo deserunt rem magni pariatur
                quos perspiciatis atque eveniet unde. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Laudantium veniam
                exercitationem expedita laborum at voluptate. Labore, voluptates
                totam at aut nemo deserunt rem magni pariatur quos perspiciatis
                atque eveniet unde. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Laudantium veniam exercitationem expedita
                laborum at voluptate. Labore, voluptates totam at aut nemo
                deserunt rem magni pariatur quos perspiciatis atque eveniet
                unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium veniam exercitationem expedita laborum at voluptate.
                Labore, voluptates totam at aut nemo deserunt rem magni pariatur
                quos perspiciatis atque eveniet unde. Laudantium veniam
                exercitationem expedita laborum at voluptate. Labore,
                voluptates.
              </p>
              <Link className="btn btn-primary" to="/shops">
                View Shops
              </Link>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-7">
              <a href="#">
                <img
                  className="img-fluid rounded mb-3 mb-md-0"
                  src="/background/toolservice1.jpg"
                  alt="toolImage"
                  style={{ height: "450px", width: "700px" }}
                />
              </a>
            </div>
            <div className="col-md-5">
              <h3>Tools</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium veniam exercitationem expedita laborum at voluptate.
                Labore, voluptates totam at aut nemo deserunt rem magni pariatur
                quos perspiciatis atque eveniet unde. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Laudantium veniam
                exercitationem expedita laborum at voluptate. Labore, voluptates
                totam at aut nemo deserunt rem magni pariatur quos perspiciatis
                atque eveniet unde. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Laudantium veniam exercitationem expedita
                laborum at voluptate. Labore, voluptates totam at aut nemo
                deserunt rem magni pariatur quos perspiciatis atque eveniet
                unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium veniam exercitationem expedita laborum at voluptate.
                Labore, voluptates totam at aut nemo deserunt rem magni pariatur
                quos perspiciatis atque eveniet unde. Laudantium veniam
                exercitationem expedita laborum at voluptate. Labore,
                voluptates.
              </p>
              <Link className="btn btn-primary" to="/tools">
                View Tools
              </Link>
            </div>
          </div>

          {/* --------------------------------------- */}
          {/* <div className="row">
            <div className="col-sm-12">
              <center>
                <h3 style={{ fontFamily: "Georgia" }}> Our Services</h3>
              </center>
            </div>
            <div className="col-lg-3 col-md-6 mb-4" style={{ height: "200px" }}>
              <div className="card h-100">
                <h5>Vehicles</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4" style={{ height: "200px" }}>
              <div className="card h-100">
                <h5>Houses</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4" style={{ height: "200px" }}>
              <div className="card h-100">
                <h5>Shops</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4" style={{ height: "200px" }}>
              <div className="card h-100">
                <h5>Tools</h5>
              </div>
            </div>
          </div> */}
          {/* --------------------------------------- */}
          <hr />
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
              margin: "4px",
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
