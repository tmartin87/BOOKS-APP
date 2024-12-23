import check from "../assets/check.svg";
import checkFull from "../assets/checkFull.png";
import {
  markAsRead,
  removeFromRead,
} from "../helperFunctions/updateUserLists.js";
import { getBooksRead } from "../helperFunctions/getDataFromDB.js";
import IconButton from "./IconButton.jsx";

function MarkAsReadButton({ book, booksRead, setBooksRead }) {
  return booksRead && booksRead.includes(book.id) ? (
    <IconButton
      imgSrc={checkFull}
      imgOnclick={removeFromRead}
      book={book}
      getUpdatedList={getBooksRead}
      updateComponent={setBooksRead}
      label="Mark As Read"
    />
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
      <p id="button-text" className="AllBooksListRow-label">
        Mark read
      </p>
    </div>
  );
}

export default MarkAsReadButton;
