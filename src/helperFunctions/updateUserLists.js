import supabase from "../supabase/config";

//WORKS
async function markAsRead(bookId, userId, getBooksRead_, setBooksRead_) {
  const { data, error } = await supabase.rpc("append_book_books_read", {
    user_id: 1, //Usuario 1 es nuestro único usuario
    new_item: Number(bookId),
  });

  if (error) {
    console.log("Error: ", error);
  } else {
    getBooksRead_(userId, setBooksRead_);
  }
}

async function unmarkAsRead(bookId, userId, getBooksRead_, setBooksRead_) {
  const { data, error } = await supabase.rpc("remove_book_books_read", {
    user_id: userId, //Usuario 1 es nuestro único usuario
    item_to_remove: Number(bookId),
  });
  if (error) {
    console.log("Error: ", error);
  } else {
    getBooksRead_(userId, setBooksRead_);
  }
}

async function MarkAsToRead(bookId, userId, getBooksToRead_, setBooksToRead_) {
  const { data, error } = await supabase.rpc("append_book_books_to_read", {
    user_id: userId,
    new_item: Number(bookId),
  });
  if (error) {
    console.log("Error: ", error);
  } else {
    getBooksToRead_(userId, setBooksToRead_);
  }
}

//WORKS
async function removeFromToRead(
  book,
  userId,
  getBooksToRead_,
  setBooksToRead_
) {
  const { data, error } = await supabase.rpc("remove_book_books_to_read", {
    user_id: userId,
    item_to_remove: Number(book),
  });
  if (error) {
    console.log("Error: ", error);
  } else {
    getBooksToRead_(userId, setBooksToRead_);
  }
}

export { markAsRead, unmarkAsRead, MarkAsToRead, removeFromToRead };
