import { Link } from "react-router-dom";
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
    
    <li className="readListRow-Container" key={book.id}>
    
    <div className="readListRow-details">
      <Link to={`/book/${book.id}/isRead`}>
        <strong className="textSmall">{book.title}</strong>
      </Link>
      <p>{book.author}</p>
      </div>
      
      <div className="readListRow-button">
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
      </div>
      
    </li>
    
  );
}

export default ReadListRow;
