import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

//Styles and components
import "./AllBooksList.css";
import AllBooksListHeader from "./AllBooksListHeader.jsx";
import AllBooksListRow from "./AllBooksListRow.jsx";
import IconButton from "./IconButton.jsx";
import Pagination from "./Pagination.jsx";
import BackToTop from "./BackToTop.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

//Icons
import check from "../assets/check.svg";
import checkFull from "../assets/checkFull.svg";
import listWithCheck from "../assets/listWithCheck.svg";

//Functions to fetch book data
import {
  getBooksToReadList,
  getBooksReadingList,
  getBooksReadList,
  getSomeBooks,
} from "../helperFunctions/getDataFromDB.js";

//Functions for IconButtons to edit user lists
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
  const [error, setError] = useState(null);

  //Array para guardar los abort controllers para cancelar las fetch requests al API
  const abortControllerArray = useRef([]);
  //Util en caso de que el usuario cambie de página antes de se hayan completado esos fetch
  //Cada uno se crea dentro de un fetch request en getCoverURL
  //Los llamamos en loop dentro del return de useEffect al cambiar de página

  useEffect(() => {
    //TODO useContext for userId to replace "1" below?
    getBooksToReadList(1, setBooksToReadList);
    getBooksReadingList(1, setBooksReadingList);
    getBooksReadList(1, setBooksReadList);
  }, []);

  useEffect(() => {
    getSomeBooks(setBooks, setError, currPage, abortControllerArray);

    return () => {
      abortControllerArray.current.forEach((abortController) => {
        abortController.abort();
      });
      //Con todas las peticiones canceladas dejamos el array vacio
      abortControllerArray.current = [];
    };
  }, [currPage]);

  return (
    <div className="AllBooksList-container">
      {error && <ErrorMessage error={error} />}
      {!error &&
      <>
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
        <BackToTop />
      </ul>
      {<Pagination currPage={currPage} setCurrPage={setCurrPage} />}
      </>}
    </div>
  );
}

export default AllBooksList;
