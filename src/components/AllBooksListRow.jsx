import "./AllBooksListRow.css";
import check from "../assets/check.svg";
import checkFull from "../assets/checkFull.svg";
import listWithCheck from "../assets/listWithCheck.svg";
import listWithCross from "../assets/listWithCross.svg";
import { Link } from "react-router-dom";
import supabase from "../supabase/config";

function AllBooksListRow({
  book,
  booksRead,
  setBooksRead,
  booksToRead,
  setBooksToRead,
  getBooksRead,
}) {
  async function markAsRead(book) {
    const { data, error } = await supabase.rpc("append_book_books_read", {
      user_id: 1,
      new_item: Number(book.id),
    });
    //Usuario 1 es nuestro único usuario
    if (error) {
      console.log("Error: ", error);
    }
    getBooksRead();
    console.log(booksRead);
  }

  /* function testFunction() {
    if (booksRead) {
      console.log(booksRead.includes(book.id));
      console.log(booksRead);
    }
  }
  testFunction(); */
  function markAsUnread(book) {
    /* const newReadBooks = [...readBooks].filter((id) => book.id !== id);
    setBooksRead(newReadBooks);
    book.isRead = false;
    console.log(newReadBooks);
    const newBooks = [...books];
    setBooks(newBooks); */
    console.log(book);
  }

  function addToList(book) {
    const newBooksToRead = [...booksToRead, book.id];
    setBooksToRead(newBooksToRead);
    book.isInList = true;
    console.log("newBooksToRead ", newBooksToRead);
    console.log("booksToRead ", booksToRead);
  }
  function removeFromList(book) {
    const newBooksToRead = [...booksToRead].filter((id) => book.id !== id);
    setBooksToRead(newBooksToRead);
    book.isInList = false;
    console.log("newBooksToRead ", newBooksToRead);
    console.log("booksToRead ", booksToRead);
  }

  return (
    <>
      <li className="AllBooksListRow">
        <div className="AllBooksListRow-cover-container">
          {book.image ? (
            <img src={book.image} alt={`${book.title} cover`} />
          ) : (
            <div className="AllBooksListRow-no-cover">Cover not available</div>
          )}
        </div>
        <p className="AllBooksListRow-rating">{book.rating}</p>
        <Link to={`/book/${book.id}`}>
          <h2 className="AllBooksListRow-title">{book.title}</h2>
        </Link>
        <p className="AllBooksListRow-author">{book.author}</p>
        <ul className="AllBooksListRow-genre">
          {book.genres.map((genre, index) => {
            return <li key={index}>{genre}</li>;
          })}
        </ul>
        {booksRead && booksRead.includes(book.id) ? (
          <img
            className="AllBooksListRow-options"
            src={checkFull}
            onClick={() => markAsUnread(book)}
          />
        ) : (
          <img
            className="AllBooksListRow-options"
            src={check}
            onClick={() => markAsRead(book)}
          />
        )}
        {book.isInList ? (
          <img
            className="AllBooksListRow-options"
            src={listWithCross}
            onClick={() => removeFromList(book)}
          />
        ) : (
          <img
            className="AllBooksListRow-options"
            src={listWithCheck}
            onClick={() => addToList(book)}
          />
        )}
      </li>
    </>
  );
}

export default AllBooksListRow;
