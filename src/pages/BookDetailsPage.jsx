import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookDetails from "../components/BookDetails";
import { createApiURL, getCoverURL } from "../helperFunctions/getImagesFromAPI.js";
import { getOneBook } from "../helperFunctions/getDataFromDB.js";
import "./BookDetailsPage.css";

function BookDetailsPage() {
  const { bookId } = useParams(); 
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [bookCover, setBookCover] = useState(null);

  

  async function getBookCover(book) {
    console.log("BOOK....", book);
    const apiURL = createApiURL(book.title, book.author);
    const bookCoverURL = await getCoverURL(apiURL); 
    setBookCover(bookCoverURL);
  }

  async function getBookDataAndCover() {
    const tempData = await getOneBook(bookId, setBook, setError);
    await getBookCover(tempData);
  }

  useEffect(() => {
    getBookDataAndCover();
  }, [bookId]);

  if (error) return <p>{error}</p>;

  if (!book) return <p>No book details available.</p>;

  return (
    <div className="BookDetailsPage-container">
      <BookDetails book={book} bookCover={bookCover} />
    </div>
  );
}

export default BookDetailsPage;