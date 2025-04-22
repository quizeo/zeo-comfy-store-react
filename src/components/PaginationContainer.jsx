import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  console.log("PaginationContainer rendered");

  const { meta } = useLoaderData();

  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    console.log(searchParams.toString());

    navigate(`${pathname}?${searchParams.toString()}`);
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
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => {
                handlePageChange(pageNumber);
              }}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
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

export default PaginationContainer;
