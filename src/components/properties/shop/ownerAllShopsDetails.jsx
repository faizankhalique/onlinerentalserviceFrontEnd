import React, { Component } from "react";
import { paginate } from "./../../../utils/paginate";
import SearchBox from "./../../common/searchBox";
import Pagination from "./../../common/pagination";
import { Link } from "react-router-dom";
class OwnerAllShopsDetails extends Component {
  state = {
    shops: [],
    shopsOnRent: "",
    freeShops: "",
    currentPage: 1,
    pageSize: 5,
    searchQuery: ""
  };
  componentDidMount() {
    const { shops } = this.props.location.state;
    let shopsOnRent = 0;
    let freeShops = 0;
    for (const shop of shops) {
      if (shop.onRent === true) shopsOnRent++;
      else freeShops++;
    }
    this.setState({ shops, shopsOnRent, freeShops });
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  filterOwnerShops = () => {
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
    const {
      shops,
      shopsOnRent,
      freeShops,
      currentPage,
      pageSize,
      searchQuery
    } = this.state;
    const allShops = this.filterOwnerShops();
    return (
      <React.Fragment>
        <div className="container" style={{ background: "#E6F2F3" }}>
          <div className="row">
            <div
              className="col-sm-3 card"
              style={{
                background: "white",
                height: "120px",
                marginLeft: "30px",
                marginTop: "10px"
              }}
            >
              <b style={{ marginTop: "5px" }}> TotalShops: {shops.length}</b>
              <b style={{ marginTop: "20px" }}> ShopsOnRent: {shopsOnRent}</b>
              <b style={{ marginTop: "20px" }}> FreeShops: {freeShops}</b>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
              <table
                className="table"
                style={{ background: "white", marginTop: "10px" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">City</th>
                    <th scope="col">Location</th>
                    <th scope="col">Area</th>
                    <th scope="col">Rent</th>
                    <th scope="col">OnRent</th>
                    <th scope="col">Registered</th>
                    <th scope="col">MemberShipDuration</th>
                  </tr>
                </thead>
                <tbody>
                  {allShops.map(shop => (
                    <tr key={shop._id}>
                      <td>
                        {" "}
                        <Link
                          to={{
                            pathname: "/shopDetails",
                            state: {
                              shopId: shop._id,
                              admin: true
                            }
                          }}
                        >
                          {shop.city}
                        </Link>
                      </td>
                      <td>{shop.location}</td>
                      <td>{shop.area}</td>
                      <td>{shop.monthlyRent}</td>
                      <td>{shop.onRent ? "OnRent" : "Free"}</td>
                      <td>
                        {shop.registered ? "Registered" : "Not-Registered"}
                      </td>
                      <td>{shop.memberShipDuration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default OwnerAllShopsDetails;
