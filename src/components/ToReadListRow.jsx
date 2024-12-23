import "./ToReadListRow.css";
import OptionButton from "./OptionButton";
import check from "../assets/check.svg"
import {
  markAsRead,
  removeFromToRead,
} from "../helperFunctions/updateUserLists";
import {getBooksReadDetails, getBooksToReadDetails} from "../helperFunctions/getDataFromDB"

function ToReadListRow({ book, setBooksReadDetails, setBooksToReadDetails }) {
  return (
    <li key={book.id}>
      <strong>{book.title}</strong> - {book.author}
      {/*Add OptionButton to move to Reading*/}
      {/*Marking as unread adds the book back to ToRead and the user can remove it from there*/}
      <OptionButton
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
      {/*Add option button to remove from ToRead - which doesn't add to another list*/}
    </li>
  );
}

export default ToReadListRow;