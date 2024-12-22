import "./AllBooksListRow.css";
import check from "../assets/check.svg";
import checkFull from "../assets/checkFull.svg";
import listWithCheck from "../assets/listWithCheck.svg";
import listWithCross from "../assets/listWithCross.svg";
import { Link } from "react-router-dom";
import {
  markAsRead,
  markAsUnread,
  addToList,
  removeFromList,
} from "../helperFunctions/updateUserLists.js";
import {
  getBooksToReadList,
  getBooksReadList,
} from "../helperFunctions/getDataFromDB.js";

function MarkAsReadButton({ book, booksReadList, setBooksReadList }) {
  return booksReadList && booksReadList.includes(book.id) ? (
    <div className="AllBooksListRow-options">
      <div className="AllBooksListRow-icon-wrapper">
        <img
          className="AllBooksListRow-icon"
          src={checkFull}
          onClick={() => {
            markAsUnread(book, getBooksReadList, setBooksReadList);
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
}

function AddToListButton({ book, booksToReadList, setBooksToReadList }) {
  return booksToReadList && booksToReadList.includes(book.id) ? (
    <div className="AllBooksListRow-options">
      <div className="AllBooksListRow-icon-wrapper">
        <img
          className="AllBooksListRow-icon"
          src={listWithCross}
          onClick={() => {
            removeFromList(book, getBooksToReadList, setBooksToReadList);
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
            addToList(book, getBooksToReadList, setBooksToReadList);
          }}
        />
      </div>
      <p className="AllBooksListRow-label">Add to list</p>
    </div>
  );
}

function AllBooksListRow({
  book,
  booksReadList,
  setBooksReadList,
  booksToReadList,
  setBooksToReadList,
}) {

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
        <Link to={`/book/${book.id}`}>
          <h2 className="AllBooksListRow-title">{book.title}</h2>
        </Link>
        <p className="AllBooksListRow-author">{book.author}</p>
        <ul className="AllBooksListRow-genre">
          {book.genres.map((genre, index) => {
            return <li key={index}>{genre}</li>;
          })}
        </ul>
       
        <MarkAsReadButton
          book={book}
          booksReadList={booksReadList}
          setBooksReadList={setBooksReadList}
        />
        <AddToListButton
          book={book}
          booksToReadList={booksToReadList}
          setBooksToReadList={setBooksToReadList}
        />
       
      </li>
    </>
  );
}

export default AllBooksListRow;
