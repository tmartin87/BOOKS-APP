import { useState } from "react";
import "./ProgressBar.css";
import { updatePagesRead } from "../helperFunctions/getDataFromDB";

function ProgressBar({
  userId,
  bookId,
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const [isSaving, setIsSaving] = useState(false);

  

  const handleProgressChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= totalPages) {
      setCurrentPage(Number(value));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log(userId);
    console.log(bookId);
    console.log(currentPage);
    
    const result = await updatePagesRead(userId, bookId, currentPage);
    setIsSaving(false);

    if (!result.success) {
      console.error("Error al guardar las páginas");
    }
  };

  const progressPercentage = (currentPage / totalPages) * 100;


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
        value={currentPage}
        onChange={(e)=>handleProgressChange(e)}
        className="ProgressBar-input"
      />
      <div className="progress-info">
        <span>
          {currentPage} / {totalPages} pages read
        </span>
      </div>
      <button onClick={handleSave} className="ProgressBar-save-button">
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default ProgressBar;
