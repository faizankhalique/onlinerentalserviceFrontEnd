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
          <div className="row">
            <div className="col-lg-12">
              <div
                style={{
                  backgroundImage: `url("/background/housebg1.jpg")`,
                  height: "400px",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  position: "relative",
                  margin: "3px"
                }}
              >
                {" "}
                <div style={{ marginLeft: "1070px" }}>
                  {" "}
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {allHouses.map(house => (
                <div key={house._id} style={{ display: "inline-block" }}>
                  <img
                    src={house.houseImages[0]}
                    style={{ margin: "10px" }}
                    className="img-responsive rounded"
                    alt="Helpful alt text"
                    width={300}
                    height={250}
                  />
                  <h5 style={{ marginLeft: "12px" }}>
                    {/* <i class="fa fa-star-o" aria-hidden="true" />
              <i class="fa fa-star-o" aria-hidden="true" />
              <i class="fa fa-star-o" aria-hidden="true" />
              <i class="fa fa-star-o" aria-hidden="true" />
              <br /> */}
                    {house.city} {house.location}
                  </h5>
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
        </div>
      </React.Fragment>
    );
  }
}

export default House;
