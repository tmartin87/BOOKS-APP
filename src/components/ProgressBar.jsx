
import "./ProgressBar.css";

function ProgressBar({ pagesRead, totalPages, onPagesReadChange }) {
  const progress = (pagesRead / totalPages) * 100;

  return (
    <div className="ProgressBar-container">
      <label>
        Pages Read: {pagesRead} / {totalPages}
      </label>
      <input
      className="ProgressBar-slider"
        type="text"
        min="0"
        max={totalPages}
        value={pagesRead}
        onChange={(e) => onPagesReadChange(Number(e.target.value))}
        
      />
      <div className="ProgressBar">
        <div
          className="ProgressBar-filled"
          style={{ width: `${progress}%` }}

          
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;