function createApiURL(title, author) {
  const formattedTitle = title.split(" ").join("+");
  const formattedAuthor = author.split(" ").join("+");
  //"https://bookcover.longitood.com/bookcover?book_title=The+Pale+Blue+Dot&author_name=Carl+Sagan"
  //"https://bookcover.longitood.com/bookcover?book_title=To+Kill+a+Mockingbird&author_name=Harper+Lee"
  const apiURL = `https://bookcover.longitood.com/bookcover?book_title=${formattedTitle}&author_name=${formattedAuthor}`;
  return apiURL;
}

async function getCoverURL(apiURL, start) {
  const apiResponse = await fetch(apiURL);
  const apiResponseJson = await apiResponse.json();
  const coverURL = apiResponseJson.url;
  console.log(coverURL);
  console.log(`Time elapsed: ${Date.now() - start} ms`);
  return coverURL;
}

//Función para añadir las URLs de imagen del API que se llama una vez con useEffect al cargarse el componente
  async function addImages(books, setBooks) {
    const start = Date.now();
    console.log(start);
    const booksWithImages = await Promise.all(
      books.map(async (book) => {
        const apiURL = createApiURL(book.title, book.author);
        const bookCoverURL = await getCoverURL(apiURL, start);
        return {
          ...book,
          image: bookCoverURL,
        };
      })
    );
    setBooks(booksWithImages);
  }

export {createApiURL, getCoverURL, addImages}