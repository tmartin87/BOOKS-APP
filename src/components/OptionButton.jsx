function OptionButton({
  imgSrc,
  imgOnclick,
  book,
  getUpdatedList,
  updateComponent,
  label,
}) {
  return (
    <>
      <div className="AllBooksListRow-options">
        <div className="AllBooksListRow-icon-wrapper">
          <img
            className="AllBooksListRow-icon"
            src={imgSrc}
            onClick={() => {
              imgOnclick(book, getUpdatedList, updateComponent);
            }}
          />
        </div>
        <p className="AllBooksListRow-label">{label}</p>
      </div>
    </>
  );
}

export default OptionButton;
