import React, { Component } from "react";
import { getHouses } from "./services/properties/house/houseReuestService";
import authService from "./services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { paginate } from "./../utils/paginate";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
class House extends Component {
  state = {
    houses: [],
    user: {},
    currentPage: 1,
    pageSize: 8,
    searchQuery: ""
  };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: houses } = await getHouses();
      if (houses) {
        this.setState({ houses, user });
      }
    } catch (error) {
      toast.error("" + error);
    }
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  filterHouses = () => {
    const { houses, pageSize, currentPage, searchQuery } = this.state;
    let searchedHouses = [];
    let paginateHouses = [];
    if (searchQuery) {
      searchedHouses = houses.filter(house =>
        house.city.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      paginateHouses = paginate(searchedHouses, currentPage, pageSize);
      return paginateHouses;
    }
    paginateHouses = paginate(houses, currentPage, pageSize);
    return paginateHouses;
  };
  render() {
    const { houses, pageSize, currentPage, searchQuery, user } = this.state;
    const allHouses = this.filterHouses();
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div style={{ marginLeft: "1120px", marginTop: "20px" }}>
            {" "}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>

          <div className="row">
            {allHouses.map(house => (
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <Link to="#">
                    <img
                      className="card-img-top"
                      src={house.houseImages[0]}
                      alt="vechileImage"
                      style={{ height: "300px" }}
                    />
                  </Link>
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to="#">
                        {house.city} {house.location}
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
            <div style={{ marginTop: "8px", marginLeft: "12px" }}>
              <Pagination
                pageSize={pageSize}
                items={houses.length}
                currentPage={currentPage}
                onPagechange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default House;
