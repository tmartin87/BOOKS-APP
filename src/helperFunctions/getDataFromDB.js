import supabase from "../supabase/config.js";

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

async function getBooksToReadList(userId, setBooksToReadList) {
  try {
    const { data } = await supabase
      .from("users-info")
      .select("booksToRead")
      .eq("id", userId) //Usuario 1 es nuestro único usuario
      .single();
    setBooksToReadList(data.booksToRead);
    console.log(data.booksToRead);
  } catch (err) {
    console.error(err);
  }
}

async function getBooksReadList(userId, setBooksReadList) {
  try {
    const { data } = await supabase
      .from("users-info")
      .select("booksRead")
      .eq("id", userId) //Usuario 1 es nuestro único usuario
      .single();
    setBooksReadList(data.booksRead);
    console.log(data.booksRead);
  } catch (err) {
    console.error(err);
  }
}

//WORKS
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

//WORKS
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
  getOneBook,
  getBooksToReadList,
  getBooksReadList,
  getBooksToReadDetails,
  getBooksReadDetails,
};
