import "./ReadListRow.css";
import IconButton from "./IconButton";
import x from "../assets/x.svg"
import {
  removeFromRead,
} from "../helperFunctions/updateUserLists";
import {
  getBooksReadDetails,
} from "../helperFunctions/getDataFromDB";

function ReadListRow({ book, setBooksReadDetails }) {
  return (
    <li key={book.id}>
      <p>
        <strong>{book.title}</strong>
      </p>
      <p>{book.author}</p>
      <IconButton
        buttonImg={x}
        label="Remove"
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
