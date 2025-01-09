//Styles and components
import "./ToReadListRow.css";
import IconButton from "./IconButton";

//Icons
import arrowRight from "../assets/arrowRight.svg";
import check from "../assets/check.svg";
import listWithCross from "../assets/listWithCross.svg"

//Import functions for IconButtons
import {
  markAsReading,
  markAsRead,
  removeFromToRead,
} from "../helperFunctions/updateUserLists";

//Import functions for initial render
import {
  getBooksReadDetails,
  getBooksReadingDetails,
  getBooksToReadDetails,
} from "../helperFunctions/getDataFromDB";

function ToReadListRow({
  book,
  setBooksToReadDetails,
  setBooksReadingDetails,
  setBooksReadDetails,
}) {
  return (
    <li className="ToReadListRow" key={book.id}>
      <div className="ToReadListRow-book-info">
        <p>
          <strong className="textSmall">{book.title}</strong>
        </p>
        <p>{book.author}</p>
      </div>
      <div className="UserBooks-icon-buttons">
        {/*TODO Add IconButton to move to Reading*/}
        <IconButton
          buttonImg={arrowRight}
          label="Start reading"
          bookId={book.id}
          addToList={markAsReading}
          getUpdatedNewList={getBooksReadingDetails}
          updateNewListComponent={setBooksReadingDetails}
          removeFromList={removeFromToRead}
          getUpdatedOldList={getBooksToReadDetails}
          updateOldListComponent={setBooksToReadDetails}
        />
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
        <IconButton
          buttonImg={listWithCross}
          label="Remove"
          bookId={book.id}
          addToList={null}
          getUpdatedNewList={null}
          updateNewListComponent={null}
          removeFromList={removeFromToRead}
          getUpdatedOldList={getBooksToReadDetails}
          updateOldListComponent={setBooksToReadDetails}
        />
      </div>
    </li>
  );
}

export default ToReadListRow;
