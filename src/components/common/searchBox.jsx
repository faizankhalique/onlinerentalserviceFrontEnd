import React from "react";
const SearchBox = ({ value, onChange }) => {
  return (
    <form className="form-inline my-2 my-lg-0">
      <input
        className="form-control my-3"
        type="search"
        name="searchQuery"
        value={value}
        onChange={e => {
          onChange(e.currentTarget.value);
        }}
        placeholder={"Search..."}
      />
    </form>
  );
};

export default SearchBox;
