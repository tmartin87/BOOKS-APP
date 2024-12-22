import "./ReadListRow.css"

function ReadListRow ({bookRead}) {
    return (
        <li key={bookRead.id}>
        <strong>{bookRead.title}</strong> - {bookRead.author}
      </li>
    )
}

export default ReadListRow;