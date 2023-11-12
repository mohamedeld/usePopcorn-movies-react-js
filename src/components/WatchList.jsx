import MoviesItem from "./MoviesItem";
import WatchItem from "./WatchItem";

const WatchList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

export default WatchList;
