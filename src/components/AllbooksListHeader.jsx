import "./AllbooksListHeader.css"

function AllBooksListHeader() {
  return (
    <>
      <li className="AllBooksListHeader-background">
        <div className="AllBooksListHeader">
          <span className="AllBooksListHeader-item cover">Cover</span>
          <span className="AllBooksListHeader-item rating">Rating</span>
          <span className="AllBooksListHeader-item">Title</span>
          <span className="AllBooksListHeader-item">Author</span>
          <span className="AllBooksListHeader-item">Genre</span>
        </div>
      </li>
    </>
  );
}

export default AllBooksListHeader;
