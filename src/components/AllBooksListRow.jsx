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
  getBooksToRead,
  getBooksRead,
} from "../helperFunctions/getDataFromDB.js";
import { useState } from "react";

function MarkAsReadButton({ book, booksRead, setBooksRead }) {
  return booksRead && booksRead.includes(book.id) ? (
    <div className="AllBooksListRow-options">
      <div className="AllBooksListRow-icon-wrapper">
        <img
          className="AllBooksListRow-icon"
          src={checkFull}
          onClick={() => {
            markAsUnread(book, getBooksRead, setBooksRead);
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
            markAsRead(book, getBooksRead, setBooksRead);
          }}
        />
      </div>
      <p className="AllBooksListRow-label">Mark read</p>
    </div>
  );
}

function AddToListButton({ book, booksToRead, setBooksToRead }) {
  return booksToRead && booksToRead.includes(book.id) ? (
    <div className="AllBooksListRow-options">
      <div className="AllBooksListRow-icon-wrapper">
        <img
          className="AllBooksListRow-icon"
          src={listWithCross}
          onClick={() => {
            removeFromList(book, getBooksToRead, setBooksToRead);
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
            addToList(book, getBooksToRead, setBooksToRead);
          }}
        />
      </div>
      <p className="AllBooksListRow-label">Add to list</p>
    </div>
  );
}

function AllBooksListRow({
  book,
  booksRead,
  setBooksRead,
  booksToRead,
  setBooksToRead,
}) {
  const [hovered, setHovered] = useState(false);

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
          booksRead={booksRead}
          setBooksRead={setBooksRead}
        />
        <AddToListButton
          book={book}
          booksToRead={booksToRead}
          setBooksToRead={setBooksToRead}
        />
       
      </li>
    </>
  );
}

export default AllBooksListRow;
