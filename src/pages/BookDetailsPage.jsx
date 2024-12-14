import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabase/config.js";
import BookDetails from "../components/BookDetails";
import "./BookDetailsPage.css";

function BookDetailsPage() {
  const { bookId } = useParams(); 
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data, error } = await supabase
          .from("books")
          .select("*");

        if (error) throw error;

        // Busca el libro con el ID correspondiente.
        const foundBook = data.find((item) => item.id === Number(bookId));

        if (!foundBook) {
          setError("Book not found.");
        } else {
          setBook(foundBook);
        }
      } catch (err) {
        setError("Failed to load book details.");
        console.error(err);
      }
    }

    fetchBooks();
  }, [bookId]);

  if (error) return <p>{error}</p>;

  if (!book) return <p>No book details available.</p>;

  return (
    <div className="BookDetailsPage-container">
      <BookDetails book={book} />
    </div>
  );
}

export default BookDetailsPage;