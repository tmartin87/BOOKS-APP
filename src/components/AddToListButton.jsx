import listWithCheck from "../assets/listWithCheck.svg";
import listWithCross from "../assets/listWithCross.svg";
import { addToList, removeFromList } from "../helperFunctions/updateUserLists.js";
import { getBooksToRead } from "../helperFunctions/getDataFromDB.js";
import"./AddToListButton.css"

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
      <p id="button-text" >Add to list</p>
    </div>
  );
}

export default AddToListButton;