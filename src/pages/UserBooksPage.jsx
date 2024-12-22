import "./UserBooksPage.css";
import { useEffect, useState } from "react";
import supabase from "../supabase/config";
import InProgressList from "../components/InProgressList";

function UserBooksPage() {
  const [BooksToReadDetails, setBooksToReadDetails] = useState([]);
  const [BooksReadDetails, setBooksReadDetails] = useState([]);
 
  async function getBooksToReadDetails(user_id) {
    const { data, error } = await supabase.rpc("get_books_to_read", {
      user_id: user_id,
    });
    if (error) {
      console.log(error);
    } else {
      setBooksToReadDetails(data);
    }
  }

  async function getBooksReadDetails(user_id) {
    const { data, error } = await supabase.rpc("get_books_read", {
      user_id: user_id,
    });
    if (error) {
      console.log(error);
    } else {
      setBooksReadDetails(data);
    }
  }

  useEffect(() => {
    getBooksToReadDetails(1);
    getBooksReadDetails(1);
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
