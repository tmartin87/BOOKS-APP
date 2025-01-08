import { useState } from "react";
import { updatePagesRead } from "../helperFunctions/getDataFromDB.js";
import ProgressBar from "./ProgressBar.jsx"; 
import "./bookDetails.css";

function BookDetails({ book, bookCover, userId }) {
  const [pagesRead, setPagesRead] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProgress = async () => {
    setIsLoading(true);
    try {
      await updatePagesRead(userId, book.id, pagesRead);
      alert("Progress saved successfully!");
    } catch (error) {
      console.error("Failed to save progress:", error);
      alert("Failed to save progress. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          <h3><strong>Author:</strong> {book.author || "Unknown Author"}</h3>
          <p><strong>Genres:</strong> {Array.isArray(book.genres) ? book.genres.join(", ") : book.genres || "N/A"}</p>
          <p><strong>Year:</strong> {book.year || "Unknown Year"}</p>
          <p><strong>Pages:</strong> {book.pages || "N/A"}</p>
          <p><strong>Rating:</strong> {book.rating || "No Rating"}</p>
          <ProgressBar
            pagesRead={pagesRead}
            totalPages={book.pages || 1} 
            onPagesReadChange={setPagesRead}  
          />
          <button 
            onClick={handleSaveProgress}
            disabled={isLoading || pagesRead === 0}
          >
            {isLoading ? "Saving..." : "Save Progress"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
