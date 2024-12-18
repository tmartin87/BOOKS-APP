import supabase from "../supabase/config";

async function markAsRead(book, getBooksRead, setBooksRead) {
  const { data, error } = await supabase.rpc("append_book_books_read", {
    user_id: 1, //Usuario 1 es nuestro único usuario
    new_item: Number(book.id),
  });

  if (error) {
    console.log("Error: ", error);
  }
  getBooksRead(setBooksRead);
}

async function markAsUnread(book, getBooksRead, setBooksRead) {
  const {data, error} = await supabase.rpc("remove_book_books_read", {
    user_id: 1,
    item_to_remove: Number(book.id)
  });
  if (error) {
    console.log("Error: ", error);
  } else {
  getBooksRead(setBooksRead);
  /* const newReadBooks = [...readBooks].filter((id) => book.id !== id);
    setBooksRead(newReadBooks);
    book.isRead = false;
    console.log(newReadBooks);
    const newBooks = [...books];
    setBooks(newBooks); */
  }
  console.log(book);
}

async function addToList(book, getBooksToRead, setBooksToRead) {
  const {data, error} = await supabase.rpc("append_book_books_to_read", {
    user_id: 1,
    new_item: Number(book.id)
  });
  if (error) {
    console.log("Error: ", error);
  }
  getBooksToRead(setBooksToRead);
  /* const newBooksToRead = [...booksToRead, book.id];
  setBooksToRead(newBooksToRead);
  console.log("newBooksToRead ", newBooksToRead);
  console.log("booksToRead ", booksToRead); */
}
async function removeFromList(book, getBooksToRead, setBooksToRead) {
  const {data, error} = await supabase.rpc("remove_book_books_to_read", {
    user_id: 1,
    item_to_remove: Number(book.id)
  });
  if (error) {
    console.log("Error: ", error);
  } else {
  getBooksToRead(setBooksToRead);
  /* const newBooksToRead = [...booksToRead].filter((id) => book.id !== id);
  setBooksToRead(newBooksToRead);
  console.log("newBooksToRead ", newBooksToRead);
  console.log("booksToRead ", booksToRead); */
  }
}

export { markAsRead, markAsUnread, addToList, removeFromList };
