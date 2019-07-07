import React from "react";
const RadioButton = ({
  label,
  onChange,
  name,
  option1,
  option2,
  option3,
  errors
}) => {
  return (
    <div>
      <label
        className="col-form-label"
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#CDCDCD"
        }}
      >
        <b> {label}</b>
      </label>
      <br />
      <div className="form-check form-check-inline">
        <input
          type="radio"
          value={option1}
          name={name}
          onChange={onChange}
          //id={option1}
          //   defaultChecked="MALE"
        />
        <label
          className="form-check-label"
          htmlFor={option1}
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#CDCDCD"
          }}
        >
          {option1}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          type="radio"
          value={option2}
          name={name}
          onChange={onChange}
          required
        />
        <label
          className="form-check-label"
          htmlFor={option2}
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#CDCDCD"
          }}
        >
          {option2}
        </label>
      </div>
      {option3 && (
        <div className="form-check form-check-inline">
          <input
            type="radio"
            value={option3}
            name={name}
            onChange={onChange}
            //id={option2}
          />
          <label
            className="form-check-label"
            htmlFor={option2}
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "#CDCDCD"
            }}
          >
            {option3}
          </label>
        </div>
      )}
      {errors ? <div className="alert alert-danger">{errors}</div> : ""}
    </div>
  );
};

export default RadioButton;
