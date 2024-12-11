import "./AllBooksListRow.css";
import check from "../assets/check.svg"
import listWithCheck from "../assets/listWithCheck.svg"
import { useState } from "react";

function AllBooksListRow({ book }) {

  const [readBooks, setReadBooks] = useState([]);
  const [booksToRead, setBooksToRead] = useState([]);
  
  function markAsRead(bookId){
    const newReadBooks = [...readBooks, bookId];
    setReadBooks(newReadBooks);
  }

  function addToList(bookId){
    console.log(bookId)
    const newBooksToRead = [...booksToRead, bookId];
    setBooksToRead(newBooksToRead);
    console.log("new list", newBooksToRead)
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
        <h2 className="AllBooksListRow-title">{book.title}</h2>
        <p className="AllBooksListRow-author">{book.author}</p>
        <ul className="AllBooksListRow-genre">
          {book.genres.map((genre, index) => {
            return <li key={index}>{genre}</li>;
          })}
          <img src={check} onClick={() => markAsRead(book.id)}/>
          <img src={listWithCheck} onClick={() => addToList(book.id)} />
        </ul>
      </li>
    </>
  );
}

export default AllBooksListRow;
