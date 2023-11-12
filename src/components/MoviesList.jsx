import MoviesItem from "./MoviesItem";
const MoviesList = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MoviesItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesList;
