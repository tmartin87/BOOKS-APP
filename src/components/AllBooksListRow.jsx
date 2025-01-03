import "./AllBooksListRow.css";
import { Link } from "react-router-dom";

function AllBooksListRow({
  book,
  children,
}) {
  return (
    <li className="AllBooksListRow">
      {book.image ? (
        <img
          className="AllBooksListRow-cover"
          src={book.image}
          alt={`${book.title} cover`}
        />
      ) : (
        <div className="AllBooksListRow-no-cover">Cover not available</div>
      )}
      <p className="AllBooksListRow-rating">{book.rating}</p>
      <Link to={`/book/${book.id}`}>
        <h2 className="AllBooksListRow-title">{book.title}</h2>
      </Link>
      <p className="AllBooksListRow-author">{book.author}</p>
      <ul className="AllBooksListRow-genre">
        {book.genres.map((genre, index) => {
          return <li key={index}>{genre}</li>;
        })}
      </ul>
      {children}
    </li>
  );
}

export default AllBooksListRow;
