import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const AddPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    console.log(searchParams.toString());

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first button
    pageButtons.push(AddPageButton({ pageNumber: 1, activeClass: page === 1 }));

    //dots
    if (page > 2) {
      pageButtons.push(
        <button className="btn btn-xs sm:btn-md join-item" key="dots-1">
          ...
        </button>
      );
    }

    //active button
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(AddPageButton({ pageNumber: page, activeClass: true }));

      //dots
      if (page < pageCount - 1) {
        pageButtons.push(
          <button className="btn btn-xs sm:btn-md join-item" key="dots-1">
            ...
          </button>
        );
      }
    }
    //last button
    pageButtons.push(
      AddPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex  justify-end">
      <div className="join">
        <button
          type="button"
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          type="button"
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
