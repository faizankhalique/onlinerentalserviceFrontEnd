import React, { Component } from "react";
import { Progress } from "reactstrap";
import http from "../services/httpService";
import { toast } from "react-toastify";
class UploadFiles extends Component {
  isTrue = false;
  state = { selectedFile: "" };
  onChangeHandler = event => {
    // console.log(event.target.files);
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event) &&
      this.minSelectFile(event)
    ) {
      // if return true allow to setState
      this.isTrue = true;
      this.setState({
        selectedFile: event.target.files, //array of files
        loaded: 0
      });
    }
  };
  onClickHandler = async event => {
    event.preventDefault();
    const data = new FormData();

    // data.append("file", this.state.selectedFile);
    for (let x = 0; x < this.state.selectedFile.length; x++) {
      data.append("file", this.state.selectedFile[x]);
    }
    try {
      const result = await http.post(
        "http://localhost:8000/api/" + this.props.url,
        data,
        {
          // receive two    parameter endpoint url ,form data
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
            // setTimeout(() => {}, 10000);
          }
        }
      );
      // console.log(result.data);
      // setTimeout(() => {}, 3000);
      this.props.onImageStatus(result.data);
    } catch (error) {
      toast.error("" + error);
    }
  };
  maxSelectFile = event => {
    let files = event.target.files; // create file object
    if (files.length > this.props.filesLength) {
      const msg = `please select ${this.props.filesLength} images`;
      event.target.value = null; // discard selected file
      toast.error("" + msg);
      this.setState({ selectedFile: "" });
      return false;
    }
    return true;
  };
  minSelectFile = event => {
    let files = event.target.files; // create file object
    if (files.length < this.props.filesLength) {
      const msg = `please select${this.props.filesLength} images`;
      event.target.value = null; // discard selected file
      toast.error("" + msg);
      this.setState({ selectedFile: "" });
      return false;
    }
    return true;
  };
  checkMimeType = event => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = this.props.filesType; //array ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
      }
    }

    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      toast.error("" + err);
      this.setState({ selectedFile: "" });
      return false;
    }
    return true;
  };
  checkFileSize = event => {
    const files = event.target.files;
    const size = this.props.fileSize * 1048576; //number of bytes
    let err = "";
    for (var x = 0; x < files.length; x++) {
      // console.log(`files[x].size:${files[x].size}  size:${size}`);
      if (files[x].size > size) {
        err += files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    if (err !== "") {
      event.target.value = null;
      toast.error("" + err);
      this.setState({ selectedFile: "" });
      return false;
    }

    return true;
  };
  render() {
    return (
      <div className="forms-group files">
        <label style={{ color: "#CDCDCD" }}>
          <b>Upload Current-Image</b>
        </label>
        <input
          type="file"
          name="file"
          multiple
          onChange={this.onChangeHandler}
          className="form-control"
        />
        <div className="form-group">
          <Progress max="100" color="success" value={this.state.loaded}>
            {Math.round(this.state.loaded, 2)}%
          </Progress>
        </div>
        <button
          type="button"
          className="btn btn-success "
          onClick={this.onClickHandler}
          disabled={!this.state.selectedFile ? true : false}
        >
          Upload
        </button>
      </div>
    );
  }
}

export default UploadFiles;
