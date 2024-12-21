import "./UserBooksPage.css";
import { useEffect, useState } from "react";
import supabase from "../supabase/config";
import InProgressList from "../components/InProgressList";

function UserBooksPage() {
  const [BooksToRead, setBooksToRead] = useState([]);
  const [BooksRead, setBooksRead] = useState([]);
  async function getList(user_id) {
    const { data, error } = await supabase.rpc("get_books_to_read", {
      user_id: user_id,
    });
    if (error) {
      console.log(error);
    } else {
      setBooksToRead(data);
    }
  }

  async function getListRead(user_id) {
    const { data, error } = await supabase.rpc("get_books_read", {
      user_id: user_id,
    });
    if (error) {
      console.log(error);
    } else {
      setBooksRead(data);
    }
  }

  useEffect(() => {
    getList(1);
    getListRead(1);
  }, []);
  return (
    <div className="UserBooksPage-container">
      {
        <div className="books-to-read">
          Books to read
          <ul>
            {BooksToRead.map((bookToRead) => (
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
            {BooksRead.map((bookRead) => (
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
