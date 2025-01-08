import { useState } from "react";
import "./ProgressBar.css";

function ProgressBar({ pagesRead, totalPages, onPagesReadChange, onSave }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleProgressChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= totalPages) {
      onPagesReadChange(Number(value));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(); // Assuming onSave is a prop passed to handle saving to Supabase
    setIsSaving(false);
  };

  const progressPercentage = (pagesRead / totalPages) * 100;

  return (
    <div className="progress-bar-container">
      <div className="ProgressBar">
        <div
          className="ProgressBar-filled"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <input
        type="number"
        min="0"
        max={totalPages}
        value={pagesRead}
        onChange={handleProgressChange}
        className="ProgressBar-input"
      />
      <div className="progress-info">
        <span>{pagesRead} / {totalPages} pages read</span>
      </div>
      <button onClick={handleSave} disabled={isSaving} className="ProgressBar-save-button">
        {isSaving ? "Saving..." : "Save Progress"}
      </button>
    </div>
  );
}

export default ProgressBar;

