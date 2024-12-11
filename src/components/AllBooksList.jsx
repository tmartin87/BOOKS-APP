import { useEffect, useState } from "react";
import supabase from "../supabase/config.js";

import "./AllBooksList.css";
import AllBooksListRow from "./AllBooksListRow.jsx";

function AllBooksList() {
  const [books, setBooks] = useState([]);

  function createApiURL(title, author) {
    const formattedTitle = title.split(" ").join("+");
    const formattedAuthor = author.split(" ").join("+");
    //"https://bookcover.longitood.com/bookcover?book_title=The+Pale+Blue+Dot&author_name=Carl+Sagan"
    //"https://bookcover.longitood.com/bookcover?book_title=To+Kill+a+Mockingbird&author_name=Harper+Lee"
    const apiURL = `https://bookcover.longitood.com/bookcover?book_title=${formattedTitle}&author_name=${formattedAuthor}`;
    return apiURL;
  }

  async function getCoverURL(apiURL) {
    const apiResponse = await fetch(apiURL);
    const apiResponseJson = await apiResponse.json();
    const coverURL = apiResponseJson.url;
    return coverURL;
  }

  //Función para añadir las URLs de imagen del API que se llama una vez con useEffect al cargarse el componente
  async function addImages(books) {
    const booksWithImages = await Promise.all(
      books.map(async (book) => {
        const apiURL = createApiURL(book.title, book.author);
        const bookCoverURL = await getCoverURL(apiURL);
        return {
          ...book,
          image: bookCoverURL,
        };
      })
    );
    setBooks(booksWithImages);
  }

  async function getBooks() {
    try {
      const { data } = await supabase
        .from("books")
        .select("author, genres, id, pages, rating, title, year");
      setBooks(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getBooks();

    //Comentado para no hacer demasiadas peticiones al API
    /* addImages(books); */
  }, []);

  return (
    <>
      <ul className="AllBooksList">
        {books.map((book, index) => {
          return <AllBooksListRow book={book} key={index} />;
        })}
      </ul>
    </>
  );
}

export default AllBooksList;
