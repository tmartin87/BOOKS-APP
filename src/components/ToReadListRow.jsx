import "./ToReadListRow.css";
import OptionButton from "./OptionButton";
import check from "../assets/check.svg"
import {
  markAsRead,
  removeFromToRead,
} from "../helperFunctions/updateUserLists";
import {getBooksReadDetails, getBooksToReadDetails} from "../helperFunctions/getDataFromDB"

function ToReadListRow({ book, setBooksToReadDetails, setBooksReadDetails }) {
  return (
    <li key={book.id}>
      <strong>{book.title}</strong> - {book.author}
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
    </li>
  );
}

export default ToReadListRow;

//removeFromList={}
//