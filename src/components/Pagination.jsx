import "./Pagination.css";
import { getSomeBooks } from "../helperFunctions/getDataFromDB";
import { getAllBooksCount } from "../helperFunctions/getDataFromDB";
import { useEffect, useState } from "react";

function Pagination({ currPage, setCurrPage, setBooks }) {

  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(()=>{
    getAllBooksCount(setNumberOfPages);
  },[])
 
    console.log(numberOfPages);
  return (
    <>
      <div className="Pagination">
        <button
          className="Pagination-button"
          onClick={() => {
            if (Number(currPage) > 0) {
              console.log("DOWN1", currPage);
              setCurrPage((curr) => curr - 1);
              getSomeBooks(setBooks, currPage - 1);
            } else {
              console.log(currPage);
            }
          }}
        >
          👈 Previous page
        </button>
        <p>Page {Number(currPage) + 1}</p>
        <button
          onClick={() => {
            if (currPage < numberOfPages) {
              // TODO calcular cuantas páginas en total
              console.log("UP1", currPage);
              setCurrPage((curr) => curr + 1);
              getSomeBooks(setBooks, currPage + 1);
            } else {
              console.log(currPage);
            }
          }}
        >
          Next page 👉
        </button>
      </div>
    </>
  );
}

export default Pagination;
