function createApiURL(title, author) {
  const formattedTitle = title.split(" ").join("+");
  const formattedAuthor = author.split(" ").join("+");
  //"https://bookcover.longitood.com/bookcover?book_title=The+Pale+Blue+Dot&author_name=Carl+Sagan"
  //"https://bookcover.longitood.com/bookcover?book_title=To+Kill+a+Mockingbird&author_name=Harper+Lee"
  const apiURL = `https://bookcover.longitood.com/bookcover?book_title=${formattedTitle}&author_name=${formattedAuthor}`;
  return apiURL;
}

async function getCoverURL(apiURL, abortControllerArray) {
  const newController = new AbortController();
  abortControllerArray.current.push(newController);
  //Guardamos dos los abortControllers para luego poder iterar sobre ellos y abortarlos uno a uno

  try{
    const newSignal = newController.signal;
    const apiResponse = await fetch(apiURL, {signal: newSignal});
    //Al dar signal al fetch estamos linkeando un abortController con cada fetch 
    // Así luego podemos parar este fetch
    const apiResponseJson = await apiResponse.json();
    const coverURL = apiResponseJson.url;
    console.log(coverURL);
    return coverURL;
  }catch(err){
    if (err.name === 'AbortError'){
      //Abortar da error el cual gestionamos de manera diferente al no ser un error de verdad
      console.log("Aborted")
    }else{
      console.log(err);
    }
  }
}

//Función para añadir las URLs de imagen del API que se llama una vez con useEffect al cargarse el componente
  async function addImages(books, abortControllerArray) {
    const booksWithImages = await Promise.all(
      books.map(async (book) => {
        const apiURL = createApiURL(book.title, book.author);
        const bookCoverURL = await getCoverURL(apiURL, abortControllerArray);
        return {
          ...book,
          image: bookCoverURL,
        };
      })
    );
    return(booksWithImages);
  }

export {createApiURL, getCoverURL, addImages}