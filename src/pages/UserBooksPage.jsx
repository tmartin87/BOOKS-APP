import "./UserBooksPage.css";
import { useEffect, useState } from "react";
import {getBooksToReadDetails, getBooksReadDetails} from "../helperFunctions/getDataFromDB"
import InProgressList from "../components/InProgressList";

function UserBooksPage() {
  const [BooksToReadDetails, setBooksToReadDetails] = useState([]);
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
              <li key={bookToRead.id}>
                <strong>{bookToRead.title}</strong> - {bookToRead.author}
              </li>
            ))}
          </ul>
        </div>
      }
      <InProgressList />
      {
        <div className="books-read">
          Books read
          <ul>
            {BooksReadDetails.map((bookRead) => (
              <li key={bookRead.id}>
                <strong>{bookRead.title}</strong> - {bookRead.author}
              </li>
            ))}
          </ul>
        </div>
      }
      
    </div>
  );
}

export default UserBooksPage;
