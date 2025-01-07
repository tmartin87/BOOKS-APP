import supabase from "../supabase/config.js";
import { getBookCovers } from "./getImagesFromAPI.js";
const booksPerPage = 10; //also defined in AllBooksList

/* async function getAllBooks(setBooks) {
  try {
    const { data } = await supabase
      .from("books")
      .select("author, genres, id, rating, title");
    setBooks(data);
  } catch (err) {
    console.error(err);
  }
} */

//Solo se llama en getSomeBooks
function prepareSomeBooksQuery(currPage, selectedGenre) {
  const startBook = currPage * booksPerPage;
  const endBook = currPage * booksPerPage + booksPerPage - 1;
  const query = supabase
    .from("books")
    .select("author, genres, id, rating, title")
    .order("rating", {
      ascending: false,
    })
    .order("title", {
      ascending: true,
    })
    .range(startBook, endBook);

  //Así se aplica el filtro por genero en los resultados
  if (selectedGenre !== "all") {
    query.overlaps("genres", [selectedGenre]);
  }

  return query;
}

async function getSomeBooks(
  currPage,
  selectedGenre,
  setBooks,
  setError,
  abortControllerArray
) {
  const query = prepareSomeBooksQuery(currPage, selectedGenre);

  try {
    const { data, error } = await query;
    if (error) {
      console.log(error);
    } else {
      const booksWithImages = await getBookCovers(data, abortControllerArray);
      setBooks(booksWithImages);
    }
  } catch (err) {
    setError(
      "Something went wrong with recovering the list of books. Try refreshing the page."
    );
    console.error(err);
  }
}

//Se refiere a páginas de la paginación, no páginas de libros
async function getNumberOfPages(setNumberOfPages, selectedGenre) {
  try {
    const query = supabase.from("books").select("id", { count: "exact" });

    if (selectedGenre !== "all") {
      query.overlaps("genres", [selectedGenre]);
    }

    const { data, error } = await query;

    if (error) {
      console.log(error);
    } else {
      const numberOfPages = Math.ceil(data.length / booksPerPage);
      setNumberOfPages(numberOfPages);
    }
  } catch (err) {
    console.error(err);
  }
}

//Conseguir lista de generos para el fitro
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
  } else if (setBooksToReadDetails){
    setBooksToReadDetails(data);
  } else {
    return data;
  }
}

async function getBooksReadingDetails(userId, setBooksReadingDetails) {
  const { data, error } = await supabase.rpc("get_books_reading", {
    user__id: userId,
  });

  if (error) {
    console.log(error);
  } else if (setBooksReadingDetails) {
    setBooksReadingDetails(data);
  } else {
    return data;
  }
}

async function getBooksReadDetails(userId, setBooksReadDetails) {
  const { data, error } = await supabase.rpc("get_books_read", {
    user_id: userId,
  });
  if (error) {
    console.log(error);
  } else if (setBooksReadDetails){
    setBooksReadDetails(data);
  } else {
    return data;
  }
}

export async function updatePagesRead(userId, bookId, pagesRead) {
  try {
    const { data, error } = await supabase
      .from('booksReading')
      .upsert([
        { user_id: userId, book_id: bookId, pages_read: pagesRead }
      ], { onConflict: ['user_id', 'book_id'] }); // This ensures the record is updated if it already exists

    if (error) {
      console.error('Error updating pages read:', error);
    } else {
      console.log('Pages read updated successfully:', data);
    }
  } catch (err) {
    console.error('Error updating pages read:', err);
  }
}
export {
  /* getAllBooks, */
  getNumberOfPages,
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
