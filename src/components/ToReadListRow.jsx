import "./ToReadListRow.css";
import IconButton from "./IconButton";
import check from "../assets/check.svg";
import {
  markAsRead,
  removeFromToRead,
} from "../helperFunctions/updateUserLists";
import {
  getBooksReadDetails,
  getBooksToReadDetails,
} from "../helperFunctions/getDataFromDB";

function ToReadListRow({ book, setBooksReadDetails, setBooksToReadDetails }) {
  return (
    <li className="ToReadListRow" key={book.id}>
      <div className="ToReadListRow-book-info">
        <p>
          <strong>{book.title}</strong>
        </p>
        <p>{book.author}</p>
      </div>
      <div className="ToReadListRow-icon-buttons">
        {/*TODO Add IconButton to move to Reading*/}
        <IconButton
          buttonImg={check}
          label="Mark as read"
          bookId={book.id}
          addToList={markAsRead}
          getUpdatedNewList={getBooksReadDetails}
          updateNewListComponent={setBooksReadDetails}
          removeFromList={removeFromToRead}
          getUpdatedOldList={getBooksToReadDetails}
          updateOldListComponent={setBooksToReadDetails}
        />
        {/* TODO Add option button to remove from ToRead - which doesn't add to another list*/}
      </div>
    </li>
  );
}

export default ToReadListRow;
