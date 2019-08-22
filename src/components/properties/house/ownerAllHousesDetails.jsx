import React, { Component } from "react";
import { paginate } from "./../../../utils/paginate";
import SearchBox from "./../../common/searchBox";
import Pagination from "./../../common/pagination";
import { Link } from "react-router-dom";
class OwnerAllHousesDetails extends Component {
  state = {
    houses: [],
    housesOnRent: "",
    freeHouses: "",
    currentPage: 1,
    pageSize: 5,
    searchQuery: ""
  };
  componentDidMount() {
    const { houses } = this.props.location.state;
    let housesOnRent = 0;
    let freeHouses = 0;
    for (const house of houses) {
      if (house.onRent === true) housesOnRent++;
      else freeHouses++;
    }
    this.setState({ houses, housesOnRent, freeHouses });
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  filterOwnerHouses = () => {
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
    const {
      houses,
      housesOnRent,
      freeHouses,
      currentPage,
      pageSize,
      searchQuery
    } = this.state;
    const allHouses = this.filterOwnerHouses();
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
              <b style={{ marginTop: "5px" }}> TotalHouses: {houses.length}</b>
              <b style={{ marginTop: "20px" }}> HousesOnRent: {housesOnRent}</b>
              <b style={{ marginTop: "20px" }}> FreeHouses: {freeHouses}</b>
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
                  {allHouses.map(house => (
                    <tr key={house._id}>
                      <td>
                        {" "}
                        <Link
                          to={{
                            pathname: "/houseDetails",
                            state: {
                              houseId: house._id,
                              admin: true
                            }
                          }}
                        >
                          {house.city}
                        </Link>
                      </td>

                      <td>{house.location}</td>
                      <td>{house.area}</td>
                      <td>{house.monthlyRent}</td>
                      <td>{house.onRent ? "OnRent" : "Free"}</td>
                      <td>
                        {house.registered ? "Registered" : "Not-Registered"}
                      </td>
                      <td>{house.memberShipDuration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default OwnerAllHousesDetails;
