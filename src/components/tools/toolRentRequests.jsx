import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { paginate } from "./../../utils/paginate";
import SearchBox from "./../common/searchBox";
import Pagination from "./../common/pagination";
import {
  getToolRentRequests,
  deleteToolRentRequest
} from "../services/tools/toolBookingService";
class ToolRentRequests extends Component {
  state = {
    toolRentRequests: [],
    pendingToolRentRequests: [],
    approvedToolRentRequests: [],
    pendingCurrentPage: 1,
    pendingPageSize: 4,
    pendingSearchQuery: "",
    approvedCurrentPage: 1,
    approvedPageSize: 4,
    approvedSearchQuery: ""
  };
  async componentDidMount() {
    try {
      const { data: toolRentRequests } = await getToolRentRequests();
      if (toolRentRequests) {
        let pendingToolRentRequests = toolRentRequests.filter(
          vr => vr.status == "Pending"
        );
        let approvedToolRentRequests = toolRentRequests.filter(
          vr => vr.status == "Approved"
        );
        this.setState({
          toolRentRequests,
          pendingToolRentRequests,
          approvedToolRentRequests
        });
      }
    } catch (error) {
      toast.error(error + "");
    }
  }
  handlePendingPageChange = page => {
    this.setState({ pendingCurrentPage: page });
  };
  handleApprovedPageChange = page => {
    this.setState({ approvedCurrentPage: page });
  };
  handlePendingSearch = query => {
    this.setState({ pendingSearchQuery: query, pendingCurrentPage: 1 });
  };
  handleApprovedSearch = query => {
    this.setState({ approvedSearchQuery: query, approvedCurrentPage: 1 });
  };
  filterPendingToolRentRequests = () => {
    const {
      pendingToolRentRequests,
      pendingPageSize,
      pendingCurrentPage,
      pendingSearchQuery
    } = this.state;
    let allRequests;
    let paginatePendingToolRentRequests = [];
    if (pendingSearchQuery) {
      allRequests = pendingToolRentRequests.filter(v =>
        v.renter.fullName
          .toLowerCase()
          .startsWith(pendingSearchQuery.toLowerCase())
      );
      paginatePendingToolRentRequests = paginate(
        allRequests,
        pendingCurrentPage,
        pendingPageSize
      );
      return paginatePendingToolRentRequests;
    }
    paginatePendingToolRentRequests = paginate(
      pendingToolRentRequests,
      pendingCurrentPage,
      pendingPageSize
    );
    return paginatePendingToolRentRequests;
  };
  filterApprovedToolRentRequests = () => {
    const {
      approvedToolRentRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allRequests;
    let paginateApprovedToolRentRequests = [];
    if (approvedSearchQuery) {
      allRequests = approvedToolRentRequests.filter(v =>
        v.renter.fullName
          .toLowerCase()
          .startsWith(approvedSearchQuery.toLowerCase())
      );
      paginateApprovedToolRentRequests = paginate(
        allRequests,
        approvedCurrentPage,
        approvedPageSize
      );
      return paginateApprovedToolRentRequests;
    }
    paginateApprovedToolRentRequests = paginate(
      approvedToolRentRequests,
      approvedCurrentPage,
      approvedPageSize
    );

    return paginateApprovedToolRentRequests;
  };
  handleDelete = async id => {
    const confirm = window.confirm("Do you want to Delete Request?");
    if (confirm) {
      const orignalToolRentRequests = this.state.pendingToolRentRequests;
      const pendingToolRentRequests = orignalToolRentRequests.filter(
        hr => hr._id !== id
      );
      this.setState({ pendingToolRentRequests });
      try {
        const { data: response } = await deleteToolRentRequest(id);
        if (response) toast.success("tool Request Delete Successfuly");
      } catch (error) {
        if (error.response && error.response.status === 400)
          toast.error(`Error:400 ${error.response.data}`);
        else if (error.response && error.response.status === 404)
          toast.error(`This Request been deleted:404 (not found)`);
        else if (error.response && error.response.status === 401)
          toast.error(`Error:401 ${error.response.statusText}`);
        else if (error.response && error.response.status === 403)
          toast.error(`Error:403 ${error.response.statusText}`);
        else toast.error(`${error.response.data}`);
        this.setState({ pendingToolRentRequests: orignalToolRentRequests });
      }
    }
  };
  render() {
    const {
      pendingToolRentRequests,
      pendingCurrentPage,
      pendingPageSize,
      pendingSearchQuery,
      approvedToolRentRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allPendingToolRentRequests = this.filterPendingToolRentRequests();
    let allApprovedToolRentRequests = this.filterApprovedToolRentRequests();
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3>Pending Tool Rent Requests</h3>
              </center>
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox
                  value={pendingSearchQuery}
                  onChange={this.handlePendingSearch}
                />
              </div>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">ToolName</th>
                    <th scope="col">toolOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allPendingToolRentRequests.map(toolRentRequest => (
                    <tr key={toolRentRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterDetails",
                            state: {
                              renterId: toolRentRequest.renter._id
                            }
                          }}
                        >
                          {toolRentRequest.renter.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/toolRentRequestDetails",
                            state: {
                              toolRentRequest: toolRentRequest
                            }
                          }}
                        >
                          {toolRentRequest.tool.toolName}
                        </Link>
                      </td>
                      <td>{toolRentRequest.owner.fullName}</td>
                      <td>{toolRentRequest.startDate}</td>
                      <td>{toolRentRequest.endDate}</td>
                      <td>{toolRentRequest.status}</td>
                      <td>{toolRentRequest.requestDate}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            this.handleDelete(toolRentRequest._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pendingPageSize}
                items={pendingToolRentRequests.length}
                currentPage={pendingCurrentPage}
                onPagechange={this.handlePendingPageChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <center>
                <h3>Approved Tool Rent Requests</h3>
              </center>
              <div style={{ marginLeft: "870px" }}>
                {" "}
                <SearchBox
                  value={approvedSearchQuery}
                  onChange={this.handleApprovedSearch}
                />
              </div>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">RequesterName</th>
                    <th scope="col">ToolName</th>
                    <th scope="col">ToolOwner</th>
                    <th scope="col">StartDate</th>
                    <th scope="col">EndDate</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                  </tr>
                </thead>
                <tbody>
                  {allApprovedToolRentRequests.map(toolRentRequest => (
                    <tr key={toolRentRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/renterDetails",
                            state: {
                              renterId: toolRentRequest.renter._id
                            }
                          }}
                        >
                          {toolRentRequest.renter.fullName}
                        </Link>
                      </td>

                      <td>
                        <Link
                          to={{
                            pathname: "/toolDetails",
                            state: {
                              toolId: toolRentRequest.tool._id,
                              admin: true
                            }
                          }}
                        >
                          {toolRentRequest.tool.toolName}
                        </Link>
                      </td>
                      <td>{toolRentRequest.owner.fullName}</td>
                      <td>{toolRentRequest.startDate}</td>
                      <td>{toolRentRequest.endDate}</td>
                      <td>{toolRentRequest.status}</td>
                      <td>{toolRentRequest.ApprovedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={approvedPageSize}
                items={approvedToolRentRequests.length}
                currentPage={approvedCurrentPage}
                onPagechange={this.handleApprovedPageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ToolRentRequests;
