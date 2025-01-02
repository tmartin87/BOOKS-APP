import "./AllBooksListFilter.css";

function AllBooksListFilter({
  genres,
  selectedGenre,
  setSelectedGenre,
  setCurrPage,
}) {
  return (
    <div className="AllBooksListFilter">
      <label htmlFor="selectedGenre">Choose a genre:</label>

      <select
        id="selectedGenre"
        value={selectedGenre}
        onChange={(e) => {
          setSelectedGenre(e.target.value);
          setCurrPage(0);
        }}
      >
        <option value="all">All</option>

        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AllBooksListFilter;
