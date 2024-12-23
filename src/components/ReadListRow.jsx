import "./ReadListRow.css"
import OptionButton from "./OptionButton";
import checkFull from "../assets/checkFull.svg";
import { MarkAsToRead, unmarkAsRead } from "../helperFunctions/updateUserLists";
import {getBooksReadDetails, getBooksToReadDetails} from "../helperFunctions/getDataFromDB";

function ReadListRow({ book, setBooksToReadDetails, setBooksReadDetails}) {
  return (
    <li key={book.id}>
      <strong>{book.title}</strong> - {book.author}
      {/*Marking as unread adds the book back to ToRead and the user can remove it from there*/}
      <OptionButton
        buttonImg={checkFull}
        label="Mark as unread"
        bookId={book.id}
        addToList={MarkAsToRead}
        getUpdatedNewList={getBooksToReadDetails}
        updateNewListComponent={setBooksToReadDetails}
        removeFromList={unmarkAsRead}
        getUpdatedOldList={getBooksReadDetails}
        updateOldListComponent={setBooksReadDetails}
      />
    </li>
  );
}

export default ReadListRow;