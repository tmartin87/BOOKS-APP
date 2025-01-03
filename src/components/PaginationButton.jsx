import "./PaginationButton.css";

function PaginationButton({page, isActivePage, changePage}) {
    

  return (
    <button
      className={isActivePage(page)}
      onClick={() => changePage(page)}
    >
      {page + 1}
    </button>
  );
}

export default PaginationButton;