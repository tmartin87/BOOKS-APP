import { useEffect, useState } from "react";
import {
  getAllBooks,
  getBooksToReadList,
  getBooksReadList,
} from "../helperFunctions/getDataFromDB.js";
import {
  createApiURL,
  getCoverURL,
} from "../helperFunctions/getImagesFromAPI.js";
import "./AllBooksList.css";
import AllBooksListRow from "./AllBooksListRow.jsx";

function AllBooksList() {
  const [books, setBooks] = useState([]);
  const [booksToReadList, setBooksToReadList] = useState([]);
  const [booksReadList, setBooksReadList] = useState([]);

  //Función para añadir las URLs de imagen del API que se llama una vez con useEffect al cargarse el componente
  async function addImages(books) {
    const start = Date.now();
    console.log(start);
    const booksWithImages = await Promise.all(
      books.map(async (book) => {
        const apiURL = createApiURL(book.title, book.author);
        const bookCoverURL = await getCoverURL(apiURL, start);
        return {
          ...book,
          image: bookCoverURL,
        };
      })
    );
    setBooks(booksWithImages);
  }

  useEffect(() => {
    /* getDataFromDB(); */
    getAllBooks(setBooks);
    //Comentado para no hacer demasiadas peticiones al API
    /* addImages(books); */
    console.log("Not fetching images...");
    getBooksReadList(setBooksReadList);
    getBooksToReadList(1, setBooksToReadList); //TODO
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

       
        {books.map((book) => (
          <AllBooksListRow
            key={book.id}
            book={book}
            booksReadList={booksReadList}
            setBooksReadList={setBooksReadList}
            booksToReadList={booksToReadList}
            setBooksToReadList={setBooksToReadList}
          />
        ))}
      </ul>
    </div>
  );
}

export default AllBooksList;
