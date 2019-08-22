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
          <div className="row">
            <div style={{ marginLeft: "1070px" }}>
              {" "}
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
            </div>
            {allShops.map(shop => (
              <div key={shop._id} style={{ display: "inline-block" }}>
                <img
                  src={shop.shopImages[0]}
                  style={{ margin: "10px" }}
                  className="img-responsive"
                  alt="Helpful alt text"
                  width={300}
                  height={250}
                />
                <h5 style={{ marginLeft: "12px" }}>
                  {shop.city} {shop.location}
                </h5>
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
