import "./Pagination.css";
import PaginationButton from "./PaginationButton";

// provad una refactorización de este tipo. Añadiendo un map reducimos la complejidad

function getPagesToRender(numberOfPages) {
  if (numberOfPages <= 7) {
    return Array.from({ length: numberOfPages }, (_, i) => i);
    // esto crea un array de longitud numberOfPages, y lo rellena con los índices del 0 al numberOfPages - 1
  } // el _ es una convención para indicar que no se va a usar el valor del parámetro, pero sí vamos a usar el índice
  return [
    0,
    1,
    2,
    "...",
    numberOfPages - 3,
    numberOfPages - 2,
    numberOfPages - 1,
  ];
  // si hay más de 7 páginas, mostramos las primeras 3, las últimas 3 y una página intermedia
}

function Pagination({ currPage, setCurrPage, numberOfPages }) {
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

  const pagesToRender = getPagesToRender(numberOfPages);

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
        {pagesToRender.map((page, idx) => {
          if (page === "...") {
            return <p key={idx}>...</p>;
          }
          return (
            <PaginationButton
              key={page}
              page={page}
              isActivePage={isActivePage}
              changePage={changePage}
            />
          );
        })}
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
