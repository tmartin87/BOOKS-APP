import supabase from "../supabase/config";

//##
//Remove from one of 3 lists
//##

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

async function markAsReading(
  bookId,
  userId,
  getBooksReading_,
  setBooksReading_
) {
  const { data, error } = await supabase.from("booksReading").insert([
    {
      book_id: bookId,
      user_id: userId,
      current_page: 0,
      last_update: new Date().toISOString().slice(0, 10),
    },
  ]);
  if (error) {
    console.log(error);
  } else {
    getBooksReading_(userId, setBooksReading_);
  }
}

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

//##
//Add to one of 3 lists
//##

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

async function removeFromReading(
  bookId,
  userId,
  getBooksReading_,
  setBooksReading_
) {
  const { data, error } = await supabase
    .from("booksReading")
    .delete()
    .eq("book_id", bookId);

  if (error) {
    console.error("Error deleting data:", error);
  } else {
    getBooksReading_(userId, setBooksReading_);
  }
}

async function removeFromRead(bookId, userId, getBooksRead_, setBooksRead_) {
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

export {
  MarkAsToRead,
  markAsReading,
  markAsRead,
  removeFromToRead,
  removeFromReading,
  removeFromRead,
};
