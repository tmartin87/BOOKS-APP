import "./AllBooksListFilter.css"

function AllBooksListFilter({genres, selectedGenre, setSelectedGenre}){
    return (
      <div className="AllBooksListFilter">
        <label htmlFor="genres">Choose a genre:</label>
        <select name="genres" id="genres">

          <option
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            All
          </option>

          {genres.map((genre, index) => (
            <option
              key={index}
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genre}
            </option>
          ))}

        </select>
      </div>
    );
}

export default AllBooksListFilter;