import React from "react";

import "./Pagination.css";

const PaginationItem = ({ active, disabled, onClick, children }) => {
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

const PaginationItems = ({ currentPage, pages, handlePageChange }) => {
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

const PaginationStart = ({ currentPage, handlePageChange }) => {
  const disabled = currentPage === 1;
  return (
    <PaginationItem
      disabled={disabled}
      onClick={() => {
        !disabled && handlePageChange(currentPage - 1);
      }}
    >
      <i className="angle left icon" />
    </PaginationItem>
  );
};

const PaginationEnd = ({ currentPage, totalPages, handlePageChange }) => {
  const disabled = currentPage === totalPages;
  return (
    <PaginationItem
      disabled={disabled}
      onClick={() => {
        !disabled && handlePageChange(currentPage + 1);
      }}
    >
      <i className="angle right icon" />
    </PaginationItem>
  );
};

export const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  let pages = [];
  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }
  return (
    <div className="ui basic center aligned segment">
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
    </div>
  );
};
