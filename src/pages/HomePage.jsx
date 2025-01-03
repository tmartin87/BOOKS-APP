import { useEffect, useState } from "react";
import { getBooksReadingDetails } from "../helperFunctions/getDataFromDB";
import "./HomePage.css";
import supabase from "../supabase/config";

function HomePage() {
  /* const [booksReadingDetails, setBooksReadingDetails] = useState(); */
  const [pagesToRead, setPagesToRead] = useState();
  const [pagesReading, setPagesReading] = useState();
  const [booksToReadCount, setbooksToReadCount] = useState();
  const [booksReadingCount, setbooksReadingCount] = useState();
  const [booksReadCount, setbooksReadCount] = useState();

  function calculatePagesToRead(data) {
    let toReadPageSum = 0;
    data.forEach((book) => {
      toReadPageSum += book.pages;
      setPagesToRead(toReadPageSum);
    });
  }

  function calculatePagesReading(data) {
    let readingPageSum = 0;
    data.forEach((book) => {
      readingPageSum += book.current_page;
      setPagesReading(readingPageSum);
    });
  }

  async function countBooksToRead(userId) {
    const { data, error } = await supabase
      .from("users-info")
      .select("booksToRead")
      .eq("id", userId);
    setbooksToReadCount(data[0].booksToRead.length);
  }

  async function countBooksReading(userId) {
    const { data, error } = await supabase
      .from("booksReading")
      .select("id", { count: "exact" })
      .eq("user_id", userId);
    setbooksReadingCount(data.length);
  }

  async function countBooksRead(userId) {
    const { data, error } = await supabase
      .from("users-info")
      .select("booksRead")
      .eq("id", userId);
    setbooksReadCount(data[0].booksRead.length);
  }

  async function calculateProgress() {
    const data = await getBooksReadingDetails(1); //TODO replace with useContext?
    calculatePagesToRead(data);
    calculatePagesReading(data);
  }

  function calculateTime(pagesPerDay, pagesToRead){
    return Math.ceil(pagesToRead/pagesPerDay);
  }

  useEffect(() => {
    calculateProgress();
    countBooksToRead(1); //TODO replace with useContext?
    countBooksReading(1); //TODO replace with useContext?
    countBooksRead(1); //TODO replace with useContext?
  }, []);

  return (
    <>
      <p>Pages to read: {pagesToRead}</p>
      <p>Pages read: {pagesReading}</p>
      <p>
        There {booksToReadCount === 1 ? "is" : "are"}{" "}
        {booksToReadCount === 1 ? "book" : "books"} {booksToReadCount} on your
        to-read list{" "}
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
