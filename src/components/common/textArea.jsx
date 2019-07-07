import React from "react";
const TextArea = ({
  label,
  name,
  type,
  value,
  onChange,
  pattern,
  placeholder,
  errors,
  color
}) => {
  return (
    <div className="form-group">
      <label
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          color: color || "#CDCDCD"
        }}
        htmlFor={label}
      >
        <b> {label}</b>
      </label>
      <textarea
        style={{
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
        placeholder={placeholder || label}
        type={type}
        name={name}
        value={value}
        className="form-control"
        id={label}
        rows="4"
        onChange={onChange}
        pattern={pattern}
        required
      />
      {errors ? <div className="alert alert-danger">{errors}</div> : ""}
    </div>
  );
};

export default TextArea;
