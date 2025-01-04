import { useEffect, useState } from "react";
import { getBooksReadingDetails, getBooksToReadDetails, getBooksReadDetails } from "../helperFunctions/getDataFromDB";
import "./HomePage.css";
import BookCountStats from "../components/BookCountStats";

function HomePage() {
  const [pagesToRead, setPagesToRead] = useState();
  const [pagesRead, setPagesRead] = useState();
  const [booksToReadCount, setbooksToReadCount] = useState();
  const [booksReadingCount, setbooksReadingCount] = useState();
  const [booksReadCount, setbooksReadCount] = useState();
  const [loading, setLoading] = useState(true);

  function sumPages(sum, books, attribute){
    books.forEach((book) => {
      sum += book[attribute];
    });
    return sum;
  }

  function calculatePagesToRead(toReadData, readingData) {
    //sumar páginas por leer en to read
    let pagesToReadSum = sumPages(0, toReadData, "pages");
    //sumar además páginas por leer en reading
    pagesToReadSum = sumPages(pagesToReadSum, readingData, "pages");
    setPagesToRead(pagesToReadSum);
  }

  function calculatePagesRead(readingData, readData) {
    let pagesReadSum = sumPages(0, readingData, "current_page");
    //TODO editar función get_books_read(user_id bigint) en supabase para que devuelva páginas también
    //pagesReadSum = sumPages(pagesReadSum, readData, "pages");
    setPagesRead(pagesReadSum);
  }

  async function calculateProgress() {
    const toReadData = await getBooksToReadDetails(1); //TODO replace with useContext?
    const readingData = await getBooksReadingDetails(1); //TODO replace with useContext?
    const readData = await getBooksReadDetails(1); //TODO replace with useContext?
    console.log("toReadData ", toReadData);
    console.log("readingData ", readingData);
    console.log("readData ", readData);
    calculatePagesToRead(toReadData, readingData);
    calculatePagesRead(readingData, readData);
    setbooksToReadCount(toReadData.length);
    setbooksReadingCount(readingData.length);
    setbooksReadCount(readData.length);
    setLoading(false);
  }

  function calculateTime(pagesPerDay, pagesToRead){
    return Math.ceil(pagesToRead/pagesPerDay);
  }

  useEffect(() => {
    calculateProgress();
  }, []);

  return (
    <>
      {!loading && (
        <>
          <h1 className="HomePage">Here's how you're doing</h1>
          <BookCountStats
            booksToReadCount={booksToReadCount}
            booksReadingCount={booksReadingCount}
            booksReadCount={booksReadCount}
          />
          <h2>Your progress in terms of pages</h2>
          <p>Pages to read: {pagesToRead}</p>
          <p>Pages read: {pagesRead}</p>


          <h2>Pace calculator</h2>
          <p>
            If you read 5 pages per day, you'll be done in{" "}
            {calculateTime(5, pagesToRead)} days{" "}
          </p>
          <p>
            If you read 15 pages per day, you'll be done in{" "}
            {calculateTime(15, pagesToRead)} days{" "}
          </p>
        </>
      )}
    </>
  );
}

export default HomePage;
