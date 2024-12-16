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

async function getBooksToRead(setBooksToRead) {
  try {
    const { data } = await supabase
      .from("users-info")
      .select("booksToRead")
      .eq("id", 1) //Usuario 1 es nuestro único usuario
      .single();
    setBooksToRead(data.booksToRead);
    console.log(data.booksToRead);
  } catch (err) {
    console.error(err);
  }
}

async function getBooksRead(setBooksRead) {
  try {
    const { data } = await supabase
      .from("users-info")
      .select("booksRead")
      .eq("id", 1) //Usuario 1 es nuestro único usuario
      .single();
    setBooksRead(data.booksRead);
    console.log(data.booksRead);
  } catch (err) {
    console.error(err);
  }
}

export { getAllBooks, getBooksToRead, getBooksRead };
