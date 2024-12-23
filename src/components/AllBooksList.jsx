import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Styles and components
import "./AllBooksList.css";
import AllBooksListRow from "./AllBooksListRow.jsx";
import IconButton from "./IconButton.jsx";

//Import icons
import check from "../assets/check.svg";
import checkFull from "../assets/checkFull.svg";
import listWithCheck from "../assets/listWithCheck.svg";
import listWithCross from "../assets/listWithCross.svg";

//Import functions for initial render
import {
  getAllBooks,
  getBooksToReadList,
  //getBooksReadingList, //Define function
  getBooksReadList,
} from "../helperFunctions/getDataFromDB.js";

import { addImages } from "../helperFunctions/getImagesFromAPI.js";

//Import functions for IconButtons
import {
  markAsRead,
  removeFromRead,
  MarkAsToRead,
  removeFromToRead,
} from "../helperFunctions/updateUserLists.js";


function AllBooksList() {
  const [books, setBooks] = useState([]);
  const [booksToReadList, setBooksToReadList] = useState([]);
  const [booksReadingList, setBooksReadingList] = useState([]);
  const [booksReadList, setBooksReadList] = useState([]);

  useEffect(() => {
    getAllBooks(setBooks);
    //Comentado para no hacer demasiadas peticiones al API
    /* addImages(books); */
    console.log("Not fetching images...");
    getBooksToReadList(1, setBooksToReadList); //TODO
    /* getBooksReadingList(1, setBooksReadingList); */
    //Define function
    getBooksReadList(1, setBooksReadList);
  }, []);

  return (
    <div className="allbookslist-container">
      <h1>FIND YOUR NEXT BOOK</h1>
      <ul className="allbookslist">
        <li className="allbookslist-header">
          <span className="header-item">Cover</span>
          <span className="header-item">Rating</span>
          <span className="header-item">Title</span>
          <span className="header-item">Author</span>
          <span className="header-item">Genre</span>
        </li>

        {books.map((book) => {
          const bookIsRead = booksReadList && booksReadList.includes(book.id);
          const bookIsInList =
            booksToReadList && booksToReadList.includes(book.id) && 
            booksReadingList && booksReadingList.includes(book.id);

          return (
            <AllBooksListRow key={book.id} book={book}>
              {/*First icon*/}
              {bookIsRead ? (
                <IconButton
                  buttonImg={checkFull}
                  label="Mark unread"
                  bookId={book.id}
                  addToList={MarkAsToRead}
                  getUpdatedNewList={getBooksToReadList}
                  removeFromList={removeFromRead}
                  getUpdatedOldList={getBooksReadList}
                  updateOldListComponent={setBooksReadList}
                />
              ) : !bookIsInList ? (
                <IconButton
                  buttonImg={check}
                  label="Mark as read"
                  bookId={book.id}
                  addToList={markAsRead}
                  getUpdatedNewList={getBooksReadList}
                  updateNewListComponent={setBooksReadList}
                  removeFromList={removeFromToRead}
                  getUpdatedOldList={getBooksToReadList}
                  updateOldListComponent={setBooksToReadList}
                />
              ) : null}

              {/*Second icon*/}
              {!bookIsRead && !bookIsInList ? (
                <IconButton
                  buttonImg={listWithCheck}
                  label="Add to list"
                  bookId={book.id}
                  addToList={MarkAsToRead}
                  getUpdatedNewList={getBooksToReadList}
                  updateNewListComponent={setBooksToReadList}
                  removeFromList={null}
                  getUpdatedOldList={null}
                  updateOldListComponent={null}
                />
              ) : (
                <Link to="/my-books">See list</Link>
              )}
            </AllBooksListRow>
          );
        })}
      </ul>
    </div>
  );
}

export default AllBooksList;

/*


  bookIsRead ? "checkFull" : !bookIsInList ? "check" : null;
  !bookIsRead && !bookIsInList ? "addToListButton" : <a>Go to list</a>;

  {
    book.isRead ? "checkFull" : !book.isInList ? "check" : null;
  }
*/

/*
 booksToReadList={booksToReadList}
 setBooksToReadList={setBooksToReadList}
 booksReadingList={booksReadingList}
 setBooksReadingList={setBooksReadingList}
 booksReadList={booksReadList}
 setBooksReadList={setBooksReadList}
 */
