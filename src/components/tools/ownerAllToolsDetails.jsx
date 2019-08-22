import React, { Component } from "react";

import { Link } from "react-router-dom";
import { paginate } from "./../../utils/paginate";
import SearchBox from "./../common/searchBox";
import Pagination from "./../common/pagination";
class OwnerAllToolsDetails extends Component {
  state = {
    tools: [],
    toolsOnRent: "",
    freeTools: "",
    currentPage: 1,
    pageSize: 5,
    searchQuery: ""
  };
  componentDidMount() {
    const { tools } = this.props.location.state;
    let toolsOnRent = 0;
    let freeTools = 0;
    for (const tool of tools) {
      if (tool.onRent === true) toolsOnRent++;
      else freeTools++;
    }
    this.setState({ tools, toolsOnRent, freeTools });
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  filterOwnerTools = () => {
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
    const {
      tools,
      toolsOnRent,
      freeTools,
      currentPage,
      pageSize,
      searchQuery
    } = this.state;
    const allTools = this.filterOwnerTools();
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
              <b style={{ marginTop: "5px" }}> TotalTools: {tools.length}</b>
              <b style={{ marginTop: "20px" }}> ToolsOnRent: {toolsOnRent}</b>
              <b style={{ marginTop: "20px" }}> FreeTools: {freeTools}</b>
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
                    <th scope="col">ToolName</th>
                    <th scope="col">Company</th>
                    <th scope="col">DailyRent</th>
                    <th scope="col">OnRent</th>
                    <th scope="col">Registered</th>
                    <th scope="col">MemberShipDuration</th>
                  </tr>
                </thead>
                <tbody>
                  {allTools.map(tool => (
                    <tr key={tool._id}>
                      <td>
                        {" "}
                        <Link
                          to={{
                            pathname: "/toolDetails",
                            state: {
                              toolId: tool._id,
                              admin: true
                            }
                          }}
                        >
                          {tool.toolName}
                        </Link>
                      </td>
                      <td>{tool.company}</td>
                      <td>{tool.dailyRent}</td>
                      <td>{tool.onRent ? "OnRent" : "Free"}</td>
                      <td>
                        {tool.registered ? "Registered" : "Not-Registered"}
                      </td>
                      <td>{tool.memberShipDuration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default OwnerAllToolsDetails;
