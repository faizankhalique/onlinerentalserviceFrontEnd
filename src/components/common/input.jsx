import React from "react";
const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  pattern,
  placeholder,
  errors,
  color,
  readonly
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
      <input
        style={{
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
        placeholder={placeholder || label}
        type={type}
        name={name}
        value={value}
        className="form-control"
        id={label}
        onChange={onChange}
        pattern={pattern}
        required
        // readonly={readonly}
      />
      {errors ? <div className="alert alert-danger">{errors}</div> : ""}
    </div>
  );
};

export default Input;
