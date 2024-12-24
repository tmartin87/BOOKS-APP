import "./ReadListRow.css";
import IconButton from "./IconButton";
import checkFull from "../assets/checkFull.svg";
import {
  MarkAsToRead,
  removeFromRead,
} from "../helperFunctions/updateUserLists";
import {
  getBooksReadDetails,
  getBooksToReadDetails,
} from "../helperFunctions/getDataFromDB";

function ReadListRow({ book, setBooksToReadDetails, setBooksReadDetails }) {
  return (
    <li key={book.id}>
      <strong>{book.title}</strong> - {book.author}
      {/*Marking as unread adds the book back to ToRead and the user can remove it from there*/}
      <IconButton
        buttonImg={checkFull}
        label="Remove from read"
        bookId={book.id}
        addToList={null}
        getUpdatedNewList={null}
        updateNewListComponent={null}
        removeFromList={removeFromRead}
        getUpdatedOldList={getBooksReadDetails}
        updateOldListComponent={setBooksReadDetails}
      />
    </li>
  );
}

export default ReadListRow;
