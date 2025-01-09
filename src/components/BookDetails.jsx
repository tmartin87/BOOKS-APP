import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar.jsx";
import "./bookDetails.css";
import { getBooksReadingDetails } from "../helperFunctions/getDataFromDB.js";

function BookDetails({ book, bookCover }) {
  const [currentPage, setCurrentPage] = useState(0);


  async function getCurrentPage() {
    const booksReadingDetails = await getBooksReadingDetails(1);
   
   
    const booksReading = booksReadingDetails.filter((currentBook) => {
     return book.id === currentBook.id;
    });
   
    
    if (booksReading.length >= 1) {
      setCurrentPage(booksReading[0].current_page)
      
      
    }
    
    
  }
 
  useEffect(() => {
  getCurrentPage()
  },[])
  

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="BookDetails-container">
      <h1>BOOK DETAILS</h1>
      <div className="BookDetails-subcontainer">
        <img
          className="BookDetails-cover"
          src={bookCover || "default_cover.jpg"}
          alt={`${book.title || "book"} cover`}
        />
        <div className="BookDetails-text">
          <h2>{book.title || "Unknown Title"}</h2>
          <h3>
            <strong>Author:</strong> {book.author || "Unknown Author"}
          </h3>
          <p>
            <strong>Genres:</strong>{" "}
            {Array.isArray(book.genres)
              ? book.genres.join(", ")
              : book.genres || "N/A"}
          </p>
          <p>
            <strong>Year:</strong> {book.year || "Unknown Year"}
          </p>
          <p>
            <strong>Pages:</strong> {book.pages || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> {book.rating || "No Rating"}
          </p>
          <ProgressBar
            currentPage={currentPage}
            totalPages={book.pages || 1}
            setCurrentPage={setCurrentPage}
            userId={1}
            bookId={book.id}
          />
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
