import "./AllBooksListHeader.css";

function AllBooksListHeader() {
  console.log("AllBooksListHeader");
  return (
    <>
      <li className="AllBooksListHeader">
        <span className="AllBooksListHeader-item">Cover</span>
        <span className="AllBooksListHeader-item">Rating</span>
        <span className="AllBooksListHeader-item">Title</span>
        <span className="AllBooksListHeader-item">Author</span>
        <span className="AllBooksListHeader-item">Genre</span>
      </li>
    </>
  );
}

export default AllBooksListHeader;
