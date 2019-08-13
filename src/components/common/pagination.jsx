import React from "react";
import _ from "lodash";
const Pagination = ({ pageSize, items, currentPage, onPagechange }) => {
  const pageCount = Math.ceil(items / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <ul className="pagination">
      {pages.map(page => (
        <li
          key={page}
          className={currentPage === page ? "page-item active" : "page-item"}
        >
          <a
            className="page-link"
            onClick={() => {
              onPagechange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
