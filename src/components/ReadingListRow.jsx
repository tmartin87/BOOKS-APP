import { Link } from "react-router-dom";
import "./ReadingListRow.css";
import IconButton from "./IconButton";
import check from "../assets/check.svg";
import pencil from "../assets/pencil.svg";
import listWithCross from "../assets/listWithCross.svg";
import {
  markAsRead,
  removeFromReading,
} from "../helperFunctions/updateUserLists";
import {
  getBooksReadingDetails,
  getBooksReadDetails,
} from "../helperFunctions/getDataFromDB";

function ReadingListRow({ book, setBooksReadingDetails, setBooksReadDetails }) {
  return (
    <li key={book.id}>
      <p>
        <strong>{book.title}</strong>
      </p>
      <p>{book.author}</p>
      <p>{book.current_page}/{book.pages}pages</p>
      <IconButton
        buttonImg={check}
        label="Mark as read"
        bookId={book.id}
        addToList={markAsRead}
        getUpdatedNewList={getBooksReadDetails}
        updateNewListComponent={setBooksReadDetails}
        removeFromList={removeFromReading}
        getUpdatedOldList={getBooksReadingDetails}
        updateOldListComponent={setBooksReadingDetails}
      />
      <div className="AllBooksListRow-options">
        <div className="AllBooksListRow-icon-wrapper">
          <Link to={`/book/${book.id}`}>
            <img src={pencil} />
          </Link>
        </div>
        <div>
          <p className="AllBooksListRow-label">Update page</p>
        </div>
      </div>
      <IconButton
        buttonImg={listWithCross}
        label="Remove"
        bookId={book.id}
        addToList={null}
        getUpdatedNewList={null}
        updateNewListComponent={null}
        removeFromList={removeFromReading}
        getUpdatedOldList={getBooksReadingDetails}
        updateOldListComponent={setBooksReadingDetails}
      />
    </li>
  );
}
export default ReadingListRow;
