import "./ToReadListRow.css";

function ToReadListRow({ bookToRead }) {
  return (
    <li key={bookToRead.id}>
      <strong>{bookToRead.title}</strong> - {bookToRead.author}
    </li>
  );
}

export default ToReadListRow;
