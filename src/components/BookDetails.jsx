import { useState } from "react";
import ProgressBar from "./ProgressBar";
import "./BookDetails.css";

function BookDetails({ book, bookCover }) {
  const [pagesRead, setPagesRead] = useState(0);

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
            <strong>Genres:</strong> {Array.isArray(book.genres) ? book.genres.join(", ") : book.genres || "N/A"}
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
            pagesRead={pagesRead}
            totalPages={book.pages || 1} // Fallback to 1 to avoid division by zero
            onPagesReadChange={setPagesRead}
          />
        </div>
      </div>
    </div>
  );
}

export default BookDetails;