import "./UserBooksPage.css";
import { useEffect, useState } from "react";
import {
  getBooksToReadDetails,
  getBooksReadDetails,
} from "../helperFunctions/getDataFromDB";
import ToReadListRow from "../components/ToReadListRow";
import ReadingListRow from "../components/ReadingListRow";
import ReadListRow from "../components/ReadListRow";

function UserBooksPage() {
  const [BooksToReadDetails, setBooksToReadDetails] = useState([]);
  const [BooksReadingDetails, setBooksReadingDetails] = useState([]);
  const [BooksReadDetails, setBooksReadDetails] = useState([]);

  useEffect(() => {
    getBooksToReadDetails(1, setBooksToReadDetails);
    getBooksReadDetails(1, setBooksReadDetails);
  }, []);
  return (
    <div className="UserBooksPage-container">
      {
        <div className="books-to-read">
          Books to read
          <ul>
            {BooksToReadDetails.map((bookToRead) => (
              <ToReadListRow
                key={bookToRead.id}
                bookToRead={bookToRead}
                setBooksToReadDetails={setBooksToReadDetails}
                setBooksReadDetails={setBooksReadDetails}
              />
            ))}
          </ul>
        </div>
      }
      <ReadingListRow />
      {
        <div className="books-read">
          Books read
          <ul>
            {BooksReadDetails.map((bookRead) => (
              <ReadListRow key={bookRead.id} bookRead={bookRead} />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default UserBooksPage;
