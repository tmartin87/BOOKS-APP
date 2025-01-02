import { useEffect, useState } from "react";
import "./Pagination.css";
import PaginationButton from "./PaginationButton";
import { getAllBooksCount } from "../helperFunctions/getDataFromDB";

function Pagination({ currPage, setCurrPage}) {
  const [numberOfPages, setNumberOfPages] = useState();
  const firstPage = currPage <= 0;
  const lastPage = currPage >= numberOfPages - 1;

  function isActivePage(page) {
    return `Pagination-page ${currPage === page ? "active" : "inactive"}-page`;
  }

  function changePage(newPage) {
    if (currPage !== newPage) {
      setCurrPage(newPage);
    }
  }

  function decrementPage() {
    if (currPage > 0) {
      setCurrPage((curr) => curr - 1);
    }
  }

  function incrementPage() {
    if (currPage < numberOfPages - 1) {
      setCurrPage((curr) => curr + 1);
    }
  }

  useEffect(() => {
    getAllBooksCount(setNumberOfPages);
  }, []);


  return (
    <>
      <div className="Pagination">
        {numberOfPages > 0 && (
          <button
            className="Pagination-forward-back"
            onClick={decrementPage}
            disabled={firstPage}
          >
            👈 Previous page
          </button>
        )}
        {numberOfPages > 0 && (
          <PaginationButton
            page={0}
            isActivePage={isActivePage}
            changePage={changePage}
          />
        )}
        {numberOfPages > 1 && (
          <PaginationButton
            page={1}
            isActivePage={isActivePage}
            changePage={changePage}
          />
        )}
        {numberOfPages > 2 && (
          <PaginationButton
            page={2}
            isActivePage={isActivePage}
            changePage={changePage}
          />
        )}
        {numberOfPages > 6 && <p>...</p>}
        {numberOfPages > 4 && (
          <PaginationButton
            page={numberOfPages - 3}
            isActivePage={isActivePage}
            changePage={changePage}
          />
        )}
        {numberOfPages > 2 && (
          <PaginationButton
            page={numberOfPages - 2}
            isActivePage={isActivePage}
            changePage={changePage}
          />
        )}
        {numberOfPages > 3 && (
          <PaginationButton
            page={numberOfPages - 1}
            isActivePage={isActivePage}
            changePage={changePage}
          />
        )}
        {numberOfPages > 0 && (
          <button
            className="Pagination-forward-back"
            onClick={incrementPage}
            disabled={lastPage}
          >
            {" "}
            Next page 👉{" "}
          </button>
        )}
      </div>
    </>
  );
}

export default Pagination;
