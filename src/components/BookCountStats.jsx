import { useState } from "react";
import "./BookCountStats.css";

function DonutChart({ booksToReadCount, booksReadingCount, booksReadCount }) {
  const [donutColors, setDonutColors] = useState(calculateDonutSlices);

  function calculateDegrees(bookCount, booksSum) {
    return Math.floor((360 * bookCount) / booksSum);
  }

  function calculateDonutSlices() {
    const booksSum = booksToReadCount + booksReadingCount + booksReadCount;

    const sliceToReadEnd = calculateDegrees(booksToReadCount, booksSum);
    const sliceReadingEnd =
      sliceToReadEnd + calculateDegrees(booksReadingCount, booksSum);

    //Color y tamaño de cada sección del donut
    const sliceToRead = `grey 0deg, grey ${sliceToReadEnd}deg`;
    const sliceReading = `purple ${sliceToReadEnd}deg, purple ${sliceReadingEnd}deg`;
    const sliceRead = `green ${sliceReadingEnd}deg`;
    console.log(
      "function ",
      `conic-gradient(${sliceToRead}, ${sliceReading}, ${sliceRead})`
    );
    return `conic-gradient(${sliceToRead}, ${sliceReading}, ${sliceRead})`;
  }

  return (
    <section className="BookCountStats">
      <h2>Your progress in terms of books</h2>
      <figure className="DonutChart">
        <div className="DonutChart-container">
          <div
            className="DonutChart-emptySlice"></div>
          <div
            className="DonutChart-slice"
            style={{
              background: donutColors,
            }}
          ></div>
        </div>
        <figcaption className="DonutChart-legend">
          <p>
            <span className="DonutChart-legend-item toRead"></span>
            You have <strong>{booksToReadCount}</strong>{" "}
            {booksToReadCount === 1 ? "book" : "books"} on your to-read list 📚
          </p>
          <p>
            <span className="DonutChart-legend-item reading"></span>
            You have <strong>{booksReadingCount}</strong>{" "}
            {booksReadingCount === 1 ? "book" : "books"} in progress 📖
          </p>
          <p>
            <span className="DonutChart-legend-item read"></span>
            You've read <strong>{booksReadCount}</strong>{" "}
            {booksReadCount === 1 ? "book" : "books"} ✅
          </p>
        </figcaption>
      </figure>
    </section>
  );
}

export default DonutChart;
