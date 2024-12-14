import "./BookDetails.css";

function BookDetails({ book }) {
  return (
    <div className="BookDetails-container">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genres:</strong> {book.genres}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Rating:</strong> {book.rating}</p>
      <img src={book.image || "default_cover.jpg"} alt={`${book.title} cover`} />
    </div>
  );
}

export default BookDetails;