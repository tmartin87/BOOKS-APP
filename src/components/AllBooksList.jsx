import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Styles and components
import "./AllBooksList.css";
import AllBooksListHeader from "./AllBooksListHeader.jsx";
import AllBooksListRow from "./AllBooksListRow.jsx";
import IconButton from "./IconButton.jsx";
import Pagination from "./Pagination.jsx";

//Import icons
import check from "../assets/check.svg";
import checkFull from "../assets/checkFull.svg";
import listWithCheck from "../assets/listWithCheck.svg";

//Import functions for initial render
import {
  //getAllBooks,
  getBooksToReadList,
  getBooksReadingList,
  getBooksReadList,
  getSomeBooks,
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
  const [currPage, setCurrPage] = useState(0);
  const [books, setBooks] = useState([]);
  const [booksToReadList, setBooksToReadList] = useState([]);
  const [booksReadingList, setBooksReadingList] = useState([]);
  const [booksReadList, setBooksReadList] = useState([]);
  const allBooksCount = 0;

  useEffect(() => {
    //getAllBooks(setBooks);
    getSomeBooks(setBooks, currPage);

    console.log("Not fetching images...");
    //addImages(books, setBooks);
    //Comentado para no hacer demasiadas peticiones al API

    //TODO useContext for userId to replace "1" below?
    getBooksToReadList(1, setBooksToReadList);
    getBooksReadingList(1, setBooksReadingList);
    getBooksReadList(1, setBooksReadList);
  }, []);

  return (
    <div className="AllBooksList-container">
      <h1>FIND YOUR NEXT BOOK</h1>
      <ul className="AllBooksList">
        <AllBooksListHeader />
        {books.map((book) => {
          const bookIsRead = booksReadList && booksReadList.includes(book.id);
          const bookIsInList =
            (booksToReadList && booksToReadList.includes(book.id)) ||
            (booksReadingList && booksReadingList.includes(book.id));

          return (
            <AllBooksListRow key={book.id} book={book}>
              {/*Icons as children*/}
              {/*First icon*/}
              {bookIsRead ? (
                <IconButton
                  buttonImg={checkFull}
                  label="Mark unread"
                  bookId={book.id}
                  addToList={null}
                  getUpdatedNewList={null}
                  updateNewListComponent={null}
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
              ) : !bookIsRead ? (
                <Link className="AllBooksList-see-list" to="/my-books">
                  On your list
                </Link>
              ) : null}
            </AllBooksListRow>
          );
        })}
      </ul>
      {
        <Pagination
          currPage={currPage}
          setCurrPage={setCurrPage}
          setBooks={setBooks}
        />
      }
    </div>
  );
}

export default AllBooksList;
