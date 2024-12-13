import "./AllBooksListRow.css";
import check from "../assets/check.svg";
import checkFull from "../assets/checkFull.svg"
import listWithCheck from "../assets/listWithCheck.svg";
import listWithCross from "../assets/listWithCross.svg";

function AllBooksListRow({
  book,
  setBooks,
  readBooks,
  setReadBooks,
  booksToRead,
  setBooksToRead,
}) {
  function markAsRead(book) {
    const newReadBooks = [...readBooks, book.id];
    setReadBooks(newReadBooks);
    book.isRead = true;
    console.log(newReadBooks);
    
  }
  function markAsUnread(book) {
    const newReadBooks = [...readBooks].filter((id) => book.id !== id);
    setReadBooks(newReadBooks);
    book.isRead = false;
    console.log(newReadBooks);
    
  }

  function addToList(book) {
    const newBooksToRead = [...booksToRead, book.id];
    setBooksToRead(newBooksToRead);
    book.isInList = true;
    console.log("newBooksToRead ", newBooksToRead);
    console.log("booksToRead ", booksToRead);
  }
  function removeFromList(book) {
    const newBooksToRead = [...booksToRead].filter((id) => book.id !== id);
    setBooksToRead(newBooksToRead);
    book.isInList = false;
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
        {book.isRead ? <img
          className="AllBooksListRow-options"
          src={checkFull}
          onClick={() => markAsUnread(book)}
        />:
        <img
          className="AllBooksListRow-options"
          src={check}
          onClick={() => markAsRead(book)}
        />}
        {book.isInList ? <img
          className="AllBooksListRow-options"
          src={listWithCross}
          onClick={() => removeFromList(book)}
        />:
        <img
          className="AllBooksListRow-options"
          src={listWithCheck}
          onClick={() => addToList(book)}
        />}
      </li>
    </>
  );
}

export default AllBooksListRow;
