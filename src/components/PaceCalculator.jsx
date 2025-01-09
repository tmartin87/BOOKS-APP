import { useState, useEffect } from "react";
import "./PaceCalculator.css";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";

function PaceCalculator({ pagesToRead }) {
  const [pagesPerDay, setPagesPerDay] = useState(Number(window.localStorage.getItem("pagesPerDay")) || 5);
  const [warning, setWarning] = useState();
  const sillyMessageBelowZero = `You can't read less than 0 pages per day 😬`;
  const sillyMessageAbovePagesToRead = `A+ for attitude, but you al your unread books sum just ${pagesToRead} pages! 🧐`;


  function checkRange(futureNumber) {
    if (futureNumber < 0) {
      setWarning(sillyMessageBelowZero);
    } else if (futureNumber > pagesToRead) {
      setWarning(sillyMessageAbovePagesToRead);
    } else {
      setWarning("");
    }
  }

  function updatePagesPerDayField(e) {
    setPagesPerDay(Number(e.target.value));
    console.log(e.target.value);
    checkRange(Number(e.target.value));
  }

  function decreasePagesPerDay() {
    if (pagesPerDay >= 0) {
      setPagesPerDay((curr) => curr - 1);
    }
    checkRange(pagesPerDay - 1);
    console.log(pagesPerDay - 1);
  }

  function increasePagesPerDay() {
    setPagesPerDay((curr) => curr + 1);
    checkRange(pagesPerDay + 1);
    console.log(pagesPerDay + 1);
  }

  function calculateTime(pagesPerDay, pagesToRead) {
    const time = pagesToRead / pagesPerDay;
    return Number(time.toFixed(2));
  }

  useEffect(()=>{
    window.localStorage.setItem('pagesPerDay', pagesPerDay) //CHECK
  },[pagesPerDay])

  return (
    <section className="PaceCalculator">
      <h2>Pace calculator</h2>
      <p className="PaceCalculator-text">
        If you read{" "}
        <img
          src={minus}
          className="PaceCalculator-control-minus"
          onClick={decreasePagesPerDay}
        />
        <input
          className="PaceCalculator-input"
          type="number"
          style={{ width: "4rem" }}
          value={pagesPerDay}
          onChange={(e) => updatePagesPerDayField(e)}
        ></input>{" "}
        <img
          src={plus}
          className="PaceCalculator-control-plus"
          onClick={increasePagesPerDay}
        />{" "}
        pages per day, you will be done in{" "}
        <strong>{calculateTime(pagesPerDay, pagesToRead)}days</strong>.
      </p>
      {warning && <p className="PaceCalculator-warning">{warning}</p>}
    </section>
  );
}

export default PaceCalculator;