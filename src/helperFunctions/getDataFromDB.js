import supabase from "../supabase/config.js";
import {addImages} from './getImagesFromAPI.js'

const booksPerPage = 10;

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

async function getAllBooksCount(setNumberOfPages) {
  try {
    const { data } = await supabase
      .from("books")
      .select("id", { count: "exact" });
    const numberOfPages = Math.ceil(data.length / booksPerPage);
    setNumberOfPages(numberOfPages)
  } catch (err) {
    console.error(err);
  }
}

async function getSomeBooks(setBooks, setError, currPage, abortControllerArray) {
  try {
    const { data } = await supabase
      .from("books")
      .select("author, genres, id, rating, title")
      .range(
        currPage * booksPerPage,
        currPage * booksPerPage + booksPerPage - 1
      );
    const booksWithImages = await addImages(data, abortControllerArray);
    setBooks(booksWithImages);
    /* setBooks(data); */
  } catch (err) {
    setError("Something went wrong with recovering the list of books. Try refreshing the page.");
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

async function getAllGenres(setGenres) {
  try {
    const { data, error } = await supabase.from("books").select("genres");

    if (error) {
      console.log("Error fetching genres: ", error);
    } else {
      const genresWithDuplicates = data.flatMap((item) => item.genres);
      const uniqueGenresSet = new Set(genresWithDuplicates);
      const uniqueGenresArray = Array.from(uniqueGenresSet);
      setGenres(uniqueGenresArray);
    }
  } catch (err) {
    console.log("Unexpected error: ", err);
  }
}

export {
  getAllBooks,
  getAllBooksCount,
  getSomeBooks,
  getOneBook,
  getBooksToReadList,
  getBooksReadingList,
  getBooksReadList,
  getBooksToReadDetails,
  getBooksReadingDetails,
  getBooksReadDetails,
  getAllGenres,
};