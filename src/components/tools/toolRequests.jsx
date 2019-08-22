import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { paginate } from "./../../utils/paginate";
import SearchBox from "./../common/searchBox";
import Pagination from "./../common/pagination";
import {
  getToolRequests,
  deleteToolRequest
} from "../services/tools/toolRequestService";
class ToolRequests extends Component {
  state = {
    toolRequests: [],
    pendingToolRequests: [],
    approvedToolRequests: [],
    pendingCurrentPage: 1,
    pendingPageSize: 4,
    pendingSearchQuery: "",
    approvedCurrentPage: 1,
    approvedPageSize: 4,
    approvedSearchQuery: ""
  };
  async componentDidMount() {
    const { data: toolRequests } = await getToolRequests();
    try {
      if (toolRequests) {
        let pendingToolRequests = toolRequests.filter(
          vr => vr.status == "Pending"
        );
        let approvedToolRequests = toolRequests.filter(
          vr => vr.status == "Approved"
        );
        this.setState({
          toolRequests,
          pendingToolRequests,
          approvedToolRequests
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
  filterPendingToolRequests = () => {
    const {
      pendingToolRequests,
      pendingPageSize,
      pendingCurrentPage,
      pendingSearchQuery
    } = this.state;
    let allRequests;
    let paginatePendingToolRequests = [];
    if (pendingSearchQuery) {
      allRequests = pendingToolRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(pendingSearchQuery.toLowerCase())
      );
      paginatePendingToolRequests = paginate(
        allRequests,
        pendingCurrentPage,
        pendingPageSize
      );
      return paginatePendingToolRequests;
    }
    paginatePendingToolRequests = paginate(
      pendingToolRequests,
      pendingCurrentPage,
      pendingPageSize
    );
    return paginatePendingToolRequests;
  };
  filterApprovedToolRequests = () => {
    const {
      approvedToolRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allRequests;
    let paginateApprovedToolRequests = [];
    if (approvedSearchQuery) {
      allRequests = approvedToolRequests.filter(v =>
        v.requester.fullName
          .toLowerCase()
          .startsWith(approvedSearchQuery.toLowerCase())
      );
      paginateApprovedToolRequests = paginate(
        allRequests,
        approvedCurrentPage,
        approvedPageSize
      );
      return paginateApprovedToolRequests;
    }
    paginateApprovedToolRequests = paginate(
      approvedToolRequests,
      approvedCurrentPage,
      approvedPageSize
    );

    return paginateApprovedToolRequests;
  };
  handleDelete = async id => {
    const confirm = window.confirm("Do you want to Delete Request?");
    if (confirm) {
      const orignalToolRequests = this.state.toolRequests;
      const toolRequests = orignalToolRequests.filter(sr => sr._id !== id);
      this.setState({ toolRequests });
      try {
        const { data: response } = await deleteToolRequest(id);
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
        this.setState({ toolRequests: orignalToolRequests });
      }
    }
  };
  render() {
    const {
      pendingToolRequests,
      pendingCurrentPage,
      pendingPageSize,
      pendingSearchQuery,
      approvedToolRequests,
      approvedCurrentPage,
      approvedPageSize,
      approvedSearchQuery
    } = this.state;
    let allPendingToolRequests = this.filterPendingToolRequests();
    let allApprovedToolRequests = this.filterApprovedToolRequests();
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <center>
                <h3>Pending Tool Requests</h3>
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
                    <th scope="col">Company</th>
                    <th scope="col">DailyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">RequestDate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allPendingToolRequests.map(toolRequest => (
                    <tr key={toolRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/productOwnerDetails",
                            state: {
                              productOwnerId: toolRequest.requester._id
                            }
                          }}
                        >
                          {toolRequest.requester.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/toolRequestDetails",
                            state: {
                              toolRequest: toolRequest
                            }
                          }}
                        >
                          {toolRequest.toolName}
                        </Link>
                      </td>
                      <td>{toolRequest.company}</td>
                      <td>{toolRequest.dailyRent}</td>
                      <td>{toolRequest.memberShipDuration}</td>
                      <td>{toolRequest.status}</td>
                      <td>{toolRequest.requestDate}</td>
                      <td>
                        <Link
                          to={{
                            pathname: "/updatetoolRequest",
                            state: {
                              toolRequest: toolRequest
                            }
                          }}
                        >
                          <button className="btn btn-primary btn-sm">
                            Update
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            this.handleDelete(toolRequest._id);
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
                items={pendingToolRequests.length}
                currentPage={pendingCurrentPage}
                onPagechange={this.handlePendingPageChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <center>
                <h3>Approved Shop Requests</h3>
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
                    <th scope="col">Company</th>
                    <th scope="col">DailyRent</th>
                    <th scope="col">MemberShip</th>
                    <th scope="col">Status</th>
                    <th scope="col">ApprovedDate</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allApprovedToolRequests.map(toolRequest => (
                    <tr key={toolRequest._id}>
                      <td>
                        <Link
                          to={{
                            pathname: "/productOwnerDetails",
                            state: {
                              productOwnerId: toolRequest.requester._id
                            }
                          }}
                        >
                          {toolRequest.requester.fullName}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/toolDetails",
                            state: {
                              toolId: toolRequest._id,
                              admin: true
                            }
                          }}
                        >
                          {toolRequest.toolName}
                        </Link>
                      </td>
                      <td>{toolRequest.company}</td>
                      <td>{toolRequest.dailyRent}</td>
                      <td>{toolRequest.memberShipDuration}</td>
                      <td>{toolRequest.status}</td>
                      <td>{toolRequest.ApprovedDate}</td>
                      <td>
                        <button className="btn btn-primary btn-sm" disabled>
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            this.handleDelete(toolRequest._id);
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
                pageSize={approvedPageSize}
                items={approvedToolRequests.length}
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

export default ToolRequests;
