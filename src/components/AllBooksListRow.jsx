import "./AllBooksListRow.css";
import { Link } from "react-router-dom";

/* function MarkAsReadButton({ book, booksReadList, setBooksReadList }) {
  return booksReadList && booksReadList.includes(book.id) ? (
    <div className="AllBooksListRow-options">
      <div className="AllBooksListRow-icon-wrapper">
        <img
          className="AllBooksListRow-icon"
          src={checkFull}
          onClick={() => {
            removeFromRead(book, getBooksReadList, setBooksReadList);
          }}
        />
      </div>
      <p className="AllBooksListRow-label">Mark unread</p>
    </div>
  ) : (
    <div className="AllBooksListRow-options">
      <div className="AllBooksListRow-icon-wrapper">
        <img
          className="AllBooksListRow-icon"
          src={check}
          onClick={() => {
            markAsRead(book, getBooksReadList, setBooksReadList);
          }}
        />
      </div>
      <p className="AllBooksListRow-label">Mark read</p>
    </div>
  );
} */

/* function AddToListButton({ book, booksToReadList, setBooksToReadList }) {
  return booksToReadList && booksToReadList.includes(book.id) ? (
    <div className="AllBooksListRow-options">
      <div className="AllBooksListRow-icon-wrapper">
        <img
          className="AllBooksListRow-icon"
          src={listWithCross}
          onClick={() => {
            removeFromToRead(book, getBooksToReadList, setBooksToReadList);
          }}
        />
      </div>
      <p className="AllBooksListRow-label">Remove</p>
    </div>
  ) : (
    <div className="AllBooksListRow-options">
      <div className="AllBooksListRow-icon-wrapper">
        <img
          className="AllBooksListRow-icon"
          src={listWithCheck}
          onClick={() => {
            MarkAsToRead(book, getBooksToReadList, setBooksToReadList);
          }}
        />
      </div>
      <p className="AllBooksListRow-label">Add to list</p>
    </div>
  );
} */

function AllBooksListRow({
  book,
  children,
  booksReadList, //REMOVE
  setBooksReadList, //REMOVE
  booksToReadList, //REMOVE
  setBooksToReadList, //REMOVE
}) {
  return (
    <li className="AllBooksListRow">
      <div className="AllBooksListRow-cover-container">
        {book.image ? (
          <img src={book.image} alt={`${book.title} cover`} />
        ) : (
          <div className="AllBooksListRow-no-cover">Cover not available</div>
        )}
      </div>
      <p className="AllBooksListRow-rating">{book.rating}</p>
      <Link to={`/book/${book.id}`}>
        <h2 className="AllBooksListRow-title">{book.title}</h2>
      </Link>
      <p className="AllBooksListRow-author">{book.author}</p>
      <ul className="AllBooksListRow-genre">
        {book.genres.map((genre, index) => {
          return <li key={index}>{genre}</li>;
        })}
      </ul>
      {children}
    </li>
  );
}

export default AllBooksListRow;

{
  /* <MarkAsReadButton
  book={book}
  booksReadList={booksReadList}
  setBooksReadList={setBooksReadList}
/>
<AddToListButton
  book={book}
  booksToReadList={booksToReadList}
  setBooksToReadList={setBooksToReadList}
/> */
}
