



import './ProgressBar.css'; 

function ProgressBar({ pagesRead, totalPages, onPagesReadChange }) {

  const handleProgressChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= totalPages) {
      onPagesReadChange(Number(value)); 
    }
  };

  return (
    <div className="progress-bar-container">
      <div className="ProgressBar-filled">
        <input
          type="number"
          min="0"
          max={totalPages}
          value={pagesRead}
          onChange={handleProgressChange}
          className="ProgressBar-bar"
        />
        <div className="progress-info">
          <span>{pagesRead} / {totalPages} pages read</span>
        </div>
      </div>
    </div>
  );
}


export default ProgressBar;
