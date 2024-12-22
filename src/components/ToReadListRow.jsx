import "./ToReadListRow.css";
import OptionButton from "./OptionButton";
import check from "../assets/check.svg"
import { markAsRead } from "../helperFunctions/updateUserLists";
import {getBooksReadDetails, getBooksToReadDetails} from "../helperFunctions/getDataFromDB"

function ToReadListRow({ bookToRead, setBooksToReadDetails, setBooksReadDetails }) {
  return (
    <li key={bookToRead.id}>
      <strong>{bookToRead.title}</strong> - {bookToRead.author}
      <OptionButton
      imgSrc={check}
      imgOnclick={markAsRead}
      bookToRead={bookToRead}
      getUpdatedList={getBooksRead}
      updateComponent={setBooksRead}
      label="Mark As Read"
    />
    </li>
    
  );
}

export default ToReadListRow;
