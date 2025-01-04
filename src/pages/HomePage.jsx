import { useEffect, useState } from "react";
import { getBooksReadingDetails, getBooksToReadDetails, getBooksReadDetails } from "../helperFunctions/getDataFromDB";
import "./HomePage.css";
/* import supabase from "../supabase/config"; */

function HomePage() {
  /* const [booksReadingDetails, setBooksReadingDetails] = useState(); */
  const [pagesToRead, setPagesToRead] = useState();
  const [pagesRead, setPagesRead] = useState();
  const [booksToReadCount, setbooksToReadCount] = useState();
  const [booksReadingCount, setbooksReadingCount] = useState();
  const [booksReadCount, setbooksReadCount] = useState();

  function sumPages(sum, books, attribute){
    books.forEach((book) => {
      sum += book[attribute];
      console.log(sum);
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
  }

  function calculateTime(pagesPerDay, pagesToRead){
    return Math.ceil(pagesToRead/pagesPerDay);
  }

  useEffect(() => {
    calculateProgress();
  }, []);

  return (
    <>
      <p>Pages to read: {pagesToRead}</p>
      <p>Pages read: {pagesRead}</p>
      <p>
        There {booksToReadCount === 1 ? "is" : "are"}{" "}
        {booksToReadCount === 1 ? "book" : "books"} {booksToReadCount} on your
        to-read list.
      </p>
      <p>
        You have {booksReadingCount}{" "}
        {booksReadingCount === 1 ? "book" : "books"} in progress
      </p>
      <p>
        You've read {booksReadCount} {booksReadCount === 1 ? "book" : "books"}!
      </p>
      <p>
        If you read 5 pages per day, you'll be done in{" "}
        {calculateTime(5, pagesToRead)} days{" "}
      </p>
      <p>
        If you read 15 pages per day, you'll be done in{" "}
        {calculateTime(15, pagesToRead)} days{" "}
      </p>
    </>
  );
}

export default HomePage;
