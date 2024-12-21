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
    getBooksToReadList(setBooksToReadList);
  }, []);

  return (
    <div className="AllBooksList-table">
      <ul className="AllBooksList-header">
        <li></li> {/*That's the cover column*/}
        <li>Rating</li>
        <li>Title</li>
        <li>Author</li>
        <li>Genre</li>
      </ul>
      <ul className="AllBooksList-rows">
        {books.map((book) => (
          <AllBooksListRow
            key={book.id}
            book={book}
            booksRead={booksReadList}
            setBooksRead={setBooksReadList}
            booksToReadList={booksToReadList}
            setBooksToReadList={setBooksToReadList}
          />
        ))}
      </ul>
    </div>
  );
}

export default AllBooksList;
