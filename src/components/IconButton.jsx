function IconButton({
  userId = 1, //TODO - Remplazar con useContext?
  buttonImg,
  label,
  bookId,
  addToList,
  getUpdatedNewList,
  updateNewListComponent,
  removeFromList,
  getUpdatedOldList,
  updateOldListComponent,
}) {
  return (
    <>
      <div className="AllBooksListRow-options">
        <div className="AllBooksListRow-icon-wrapper">
          <img
            className="AllBooksListRow-icon"
            src={buttonImg}
            onClick={() => {
              if (addToList) {
                addToList(
                  bookId,
                  userId,
                  getUpdatedNewList,
                  updateNewListComponent
                );
              }
              if (removeFromList) {
                removeFromList(
                  bookId,
                  userId,
                  getUpdatedOldList,
                  updateOldListComponent
                );
              }
            }}
          />
        </div>
        <p className="AllBooksListRow-label">{label}</p>
      </div>
    </>
  );
}

export default IconButton;
