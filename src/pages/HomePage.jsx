import { useEffect, useState } from "react";
import { getBooksReadingDetails, getBooksToReadDetails, getBooksReadDetails } from "../helperFunctions/getDataFromDB";
import "./HomePage.css";
import BookCountStats from "../components/BookCountStats";
import PaceCalculator from "../components/PaceCalculator";

function HomePage() {
  const [pagesToRead, setPagesToRead] = useState();
  const [pagesRead, setPagesRead] = useState();
  const [booksToReadCount, setbooksToReadCount] = useState();
  const [booksReadingCount, setbooksReadingCount] = useState();
  const [booksReadCount, setbooksReadCount] = useState();
  const [loading, setLoading] = useState(true);

  function sumPages(sum, books, attribute){
    const newSum = books.reduce((acc, book) => {
      if (attribute == "current_page"){
        return acc + book[attribute] - 1;
      }
      return acc + book[attribute];
    }, sum);
    return newSum;
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
    pagesReadSum = sumPages(pagesReadSum, readData, "pages");
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

  useEffect(() => {
    calculateProgress();
  }, []);

  return (
    <>
      {!loading && (
        <>
          <h1 className="HomePage">Welcome back!</h1>
          <BookCountStats
            booksToReadCount={booksToReadCount}
            booksReadingCount={booksReadingCount}
            booksReadCount={booksReadCount}
          />
          <br></br>
          <br></br>
          <h2>Your progress in terms of pages</h2>
          <p>Pages to read: {pagesToRead}</p>
          <p>Pages read: {pagesRead}</p>

          <PaceCalculator pagesToRead={pagesToRead} />
        </>
      )}
    </>
  );
}

export default HomePage;
