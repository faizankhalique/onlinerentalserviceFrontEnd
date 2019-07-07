import React from "react";
const Select = ({ name, label, value, onChange, options, errors, color }) => {
  return (
    <div className="form-group">
      <label
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          color: color || "#CDCDCD"
        }}
        htmlFor={name}
      >
        <b> {label}</b>
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        placeholder={name}
        className="custom-select custom-select-md mb-3"
        required
      >
        <option value="">{"Select"}</option>
        {options.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {errors ? <div className="alert alert-danger">{errors}</div> : ""}
    </div>
  );
};

export default Select;
