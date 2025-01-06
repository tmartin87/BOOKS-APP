import "./UserBooksPage.css";
import { useEffect, useState, useRef } from "react";
import {
  getBooksToReadDetails,
  getBooksReadingDetails,
  getBooksReadDetails,
} from "../helperFunctions/getDataFromDB";
import ToReadListRow from "../components/ToReadListRow";
import ReadingListRow from "../components/ReadingListRow";
import ReadListRow from "../components/ReadListRow";

function UserBooksPage() {
  const [BooksToReadDetails, setBooksToReadDetails] = useState([]);
  const [BooksReadingDetails, setBooksReadingDetails] = useState([]);
  const [BooksReadDetails, setBooksReadDetails] = useState([]);

  const abortControllerArray = useRef([]);

  useEffect(() => {
    getBooksToReadDetails(1, setBooksToReadDetails);
    getBooksReadingDetails(1, setBooksReadingDetails, abortControllerArray);
    getBooksReadDetails(1, setBooksReadDetails);
    return () => {
      abortControllerArray.current.forEach((abortController) => {
        abortController.abort();
      });
      abortControllerArray.current = [];
    };
  }, []);
  return (
    <div className="UserBooksPage-container">
      {
        <div className="books-to-read">
          <h2>📚 To read</h2>
          <ul className="books-to-read-details">
            {BooksToReadDetails.map((book) => (
              <ToReadListRow
                key={book.id}
                book={book}
                setBooksToReadDetails={setBooksToReadDetails}
                setBooksReadingDetails={setBooksReadingDetails}
                setBooksReadDetails={setBooksReadDetails}
              />
            ))}
          </ul>
        </div>
      }
      {
        <div className="books-reading">
          <h2>📖 Reading</h2>
          <ul className="books-reading-details">
            {BooksReadingDetails.map((book) => (
              <ReadingListRow
                key={book.id}
                book={book}
                setBooksReadingDetails={setBooksReadingDetails}
                setBooksReadDetails={setBooksReadDetails}
              />
            ))}
          </ul>
        </div>
      }
      {
        <div className="books-read">
          <h2>✅ Read</h2>
          <ul className="books-read-details">
            {BooksReadDetails.map((book) => (
              <ReadListRow
                key={book.id}
                book={book}
                setBooksReadDetails={setBooksReadDetails}
              />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default UserBooksPage;
