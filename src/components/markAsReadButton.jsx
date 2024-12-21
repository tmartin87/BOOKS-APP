import check from "../assets/check.svg";
import checkFull from "../assets/checkFull.png";
import { markAsRead, markAsUnread } from "../helperFunctions/updateUserLists.js";
import { getBooksRead } from "../helperFunctions/getDataFromDB.js";

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
      <p id="button-text" className="AllBooksListRow-label">Mark read</p>
    </div>
  );
}

export default MarkAsReadButton;