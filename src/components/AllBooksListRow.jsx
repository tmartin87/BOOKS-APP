import "./AllBooksListRow.css";

function AllBooksListRow({ book }) {
  return (
    <>
      <li className="AllBooksListRow">
        <div className="AllBooksListRow-cover-container">
          {book.image ? (
            <img src={book.image} alt={`${book.title} cover`} />
          ) : (
            <div className="AllBooksListRow-no-cover">Cover not available</div>
          )}
        </div>
        <p className="AllBooksListRow-rating">{book.rating}</p>
        <h2 className="AllBooksListRow-title">{book.title}</h2>
        <p className="AllBooksListRow-author">{book.author}</p>
        <ul className="AllBooksListRow-genre">
          {book.genres.map((genre, index) => {
            return <li key={index}>{genre}</li>
          })}
        </ul>
      </li>
    </>
  );
}

export default AllBooksListRow;
