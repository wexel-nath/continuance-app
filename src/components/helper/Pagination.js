import React from "react";

import "./Pagination.css";

export const PaginationItem = ({ active, disabled, onClick, children }) => {
  return (
    <div
      className={`icon ${disabled && "disabled"} ${active &&
        "active"} item pagination-item`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const PaginationStart = ({ currentPage, handlePageChange }) => {
  return (
    <PaginationItem
      disabled={currentPage === 1}
      onClick={() => {
        handlePageChange(currentPage - 1);
      }}
    >
      <i className="angle left icon" />
    </PaginationItem>
  );
};

export const PaginationEnd = ({
  currentPage,
  totalPages,
  handlePageChange
}) => {
  return (
    <PaginationItem
      disabled={currentPage === totalPages}
      onClick={() => {
        handlePageChange(currentPage + 1);
      }}
    >
      <i className="angle right icon" />
    </PaginationItem>
  );
};

export const PaginationItems = ({ currentPage, pages, handlePageChange }) => {
  return pages.map(page => {
    const active = currentPage === page;
    return (
      <PaginationItem
        active={active}
        key={page}
        onClick={() => {
          !active && handlePageChange(page);
        }}
      >
        {page}
      </PaginationItem>
    );
  });
};

export const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  console.log(handlePageChange);
  let pages = [];
  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }
  return (
    <div className="ui pagination menu">
      <PaginationStart
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <PaginationItems
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        pages={pages}
      />
      <PaginationEnd
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};
