import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getTools } from "../services/tools/toolRequestService";
import authService from "../services/authService";
import { paginate } from "./../../utils/paginate";
import SearchBox from "./../common/searchBox";
import Pagination from "./../common/pagination";
class Tools extends Component {
  state = { tools: [], user: {}, currentPage: 1, pageSize: 8, searchQuery: "" };
  async componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      const { data: tools } = await getTools();
      if (tools) {
        this.setState({ tools, user });
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
  filterTools = () => {
    const { tools, pageSize, currentPage, searchQuery } = this.state;
    let searchedTools = [];
    let paginateTools = [];
    if (searchQuery) {
      searchedTools = tools.filter(tool =>
        tool.toolName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      paginateTools = paginate(searchedTools, currentPage, pageSize);
      return paginateTools;
    }
    paginateTools = paginate(tools, currentPage, pageSize);
    return paginateTools;
  };
  render() {
    const { tools, user, pageSize, currentPage, searchQuery } = this.state;
    const allTools = this.filterTools();
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div style={{ marginLeft: "1120px", marginTop: "20px" }}>
            {" "}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
          <div className="row">
            {allTools.map(tool => (
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100">
                  <Link to="#">
                    <img
                      className="card-img-top"
                      src={tool.toolImages[0]}
                      alt="vechileImage"
                      style={{ height: "300px" }}
                    />
                  </Link>
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to="#">{tool.toolName}</Link>
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
            <div style={{ marginTop: "8px", marginLeft: "12px" }}>
              <Pagination
                pageSize={pageSize}
                items={tools.length}
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

export default Tools;
