import MoviesItem from "./MoviesItem";
const MoviesList = ({ movies, onHandleSelect }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesItem
          key={movie.imdbID}
          movie={movie}
          handleSelected={onHandleSelect}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
