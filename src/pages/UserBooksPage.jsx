import "./UserBooksPage.css";
import { getBooksToRead, getBooksRead } from "../helperFunctions/getDataFromDB";
import { useEffect, useState } from "react";
import supabase from "../supabase/config";
/* import InProgressList from "../components/InProgressList"  */

function UserBooksPage() {
  const [BooksToRead, setBooksToRead] = useState([]);
  const [BooksRead, setBooksRead] = useState([]);
  async function getList(user_id) {
    const {data, error} = await supabase.rpc("get_books_to_read", {
      user_id: user_id
    });
    if (error) {
      console.log(error);
    } else {
      setBooksToRead(data);}
    }
    
  useEffect(() => {
    getList(1);
  }, []);
  return (
    <div className="UserBooksPage-container">
      <div className="current-book">Current Book</div>
      <div className="books-to-read">Books to read
      <ul></ul></div>
      <div className="books-read">Books read</div>
      {/* <InProgressList /> */}
    </div>
  );
}

export default UserBooksPage;
