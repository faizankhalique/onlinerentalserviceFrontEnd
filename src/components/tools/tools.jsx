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
          <div className="row">
            <div className="col-lg-12">
              <div
                style={{
                  backgroundImage: `url("/background/toolbg.jpg")`,
                  height: "800px",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  position: "relative",
                  margin: "3px"
                }}
              >
                <div style={{ marginLeft: "1070px" }}>
                  {" "}
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {allTools.map(tool => (
                <div key={tool._id} style={{ display: "inline-block" }}>
                  <img
                    src={tool.toolImages[0]}
                    style={{ margin: "10px" }}
                    className="img-responsive"
                    alt="Helpful alt text"
                    width={300}
                    height={250}
                  />
                  <h4 style={{ marginLeft: "12px" }}>{`${tool.toolName}`}</h4>
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
        </div>
      </React.Fragment>
    );
  }
}

export default Tools;
