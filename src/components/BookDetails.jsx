import "./BookDetails.css";

function BookDetails({ book, bookCover }) {
  return (
    <div className="BookDetails-container">.
    <h1>BOOK DETAILS</h1>
    <div className="BookDetails-subcontainer">
    <img className="BookDetails-cover"src={bookCover || "default_cover.jpg"} alt={`${book.title} cover`} />
    <div className="BookDetails-text">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genres:</strong> {book.genres}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Rating:</strong> {book.rating}</p>
      </div>
    </div>
    </div>
  );
}

export default BookDetails;