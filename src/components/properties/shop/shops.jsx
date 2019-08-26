import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getShops } from "../../services/properties/shop/shopRequestService";
import authService from "../../services/authService";
import SearchBox from "./../../common/searchBox";
import Pagination from "./../../common/pagination";
import { paginate } from "./../../../utils/paginate";
class Shops extends Component {
  state = { shops: [], user: {}, currentPage: 1, pageSize: 8, searchQuery: "" };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: shops } = await getShops();
      if (shops) {
        this.setState({ shops, user });
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
  filterShops = () => {
    const { shops, pageSize, currentPage, searchQuery } = this.state;
    let searchedShops = [];
    let paginateShops = [];
    if (searchQuery) {
      searchedShops = shops.filter(shop =>
        shop.city.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      paginateShops = paginate(searchedShops, currentPage, pageSize);
      return paginateShops;
    }
    paginateShops = paginate(shops, currentPage, pageSize);
    return paginateShops;
  };
  render() {
    const { shops, user, pageSize, currentPage, searchQuery } = this.state;
    const allShops = this.filterShops();
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div style={{ marginLeft: "1120px", marginTop: "20px" }}>
            {" "}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
          <div className="row">
            {allShops.map(shop => (
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <Link to="#">
                    <img
                      className="card-img-top"
                      src={shop.shopImages[0]}
                      alt="vechileImage"
                      style={{ height: "300px" }}
                    />
                  </Link>
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to="#">
                        {shop.city} {shop.location}
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
            <div style={{ marginTop: "8px", marginLeft: "12px" }}>
              <Pagination
                pageSize={pageSize}
                items={shops.length}
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

export default Shops;
