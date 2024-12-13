import "./AllBooksListRow.css";
import check from "../assets/check.svg";
import listWithCheck from "../assets/listWithCheck.svg";

function AllBooksListRow({
  book,
  readBooks,
  setReadBooks,
  booksToRead,
  setBooksToRead,
}) {
  function markAsRead(bookId) {
    const newReadBooks = [...readBooks, bookId];
    setReadBooks(newReadBooks);
  }

  function addToList(bookId) {
    console.log("id", bookId);
    console.log("BooksToRead ", booksToRead);
    const newBooksToRead = [...booksToRead, bookId];
    setBooksToRead(newBooksToRead);
    console.log("newBooksToRead ", newBooksToRead);
    console.log("booksToRead ", booksToRead);
  }

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
            return <li key={index}>{genre}</li>;
          })}
        </ul>
        <img
          className="AllBooksListRow-options"
          src={check}
          onClick={() => markAsRead(book.id)}
        />
        <img
          className="AllBooksListRow-options"
          src={listWithCheck}
          onClick={() => addToList(book.id)}
        />
      </li>
    </>
  );
}

export default AllBooksListRow;
