import supabase from "../supabase/config.js";

//Any books
async function getAllBooks(setBooks) {
  try {
    const { data } = await supabase
      .from("books")
      .select("author, genres, id, rating, title");
    setBooks(data);
  } catch (err) {
    console.error(err);
  }
}

async function getSomeBooks(setBooks, currPage) {
  try {
    const { data } = await supabase
      .from("books")
      .select("author, genres, id, rating, title")
      .range(currPage * 20, (currPage * 20)+19);
    setBooks(data);

  } catch (err) {
    console.error(err);
  }
}

async function getOneBook(bookId, setBook, setError) {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", bookId)
      .single();
    if (error) throw error;

    if (!data) {
      setError("Book not found.");
    } else {
      setBook(data);
      return data;
    }
  } catch (err) {
    setError("Failed to load book details.");
    console.error(err);
  }
}

//User's books just IDs

async function getBooksToReadList(userId, setBooksToReadList) {
  const { data, error } = await supabase
  .from("users-info")
  .select("booksToRead")
  .eq("id", userId)
  .single();
    if (error) {
      console.log(error);
    } else {
    setBooksToReadList(data.booksToRead);
  }
}

async function getBooksReadingList(userId, setBooksReadingList) {
  const { data, error } = await supabase
    .from("booksReading")
    .select("book_id")
    .eq("user_id", userId);
  const booksReadingArray = data.map((item) => item.book_id);
  if (error) {
    console.log(error);
  } else {
    setBooksReadingList(booksReadingArray);
  }
}

async function getBooksReadList(userId, setBooksReadList) {
  const { data, error } = await supabase
  .from("users-info")
  .select("booksRead")
  .eq("id", userId)
    .single();
  if (error) {
    console.log(error);
  } else {
    setBooksReadList(data.booksRead);
  }
}

//User's books with details

async function getBooksToReadDetails(userId, setBooksToReadDetails) {
  const { data, error } = await supabase.rpc("get_books_to_read", {
    user_id: userId,
  });
  if (error) {
    console.log(error);
  } else {
    setBooksToReadDetails(data);
  }
}

async function getBooksReadingDetails(userId, setBooksReadingDetails) {
  const { data, error } = await supabase.rpc("get_books_reading", {
    user__id: userId,
  });
  
  if (error) {
    console.log(error);

  } else {
    setBooksReadingDetails(data);
  }
}

async function getBooksReadDetails(userId, setBooksReadDetails) {
  const { data, error } = await supabase.rpc("get_books_read", {
    user_id: userId,
  });
  if (error) {
    console.log(error);
  } else {
    setBooksReadDetails(data);
  }
}

export {
  getAllBooks,
  getSomeBooks,
  getOneBook,
  getBooksToReadList,
  getBooksReadingList,
  getBooksReadList,
  getBooksToReadDetails,
  getBooksReadingDetails,
  getBooksReadDetails,
};
