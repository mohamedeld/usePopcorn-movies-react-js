import MoviesItem from "./MoviesItem";
import WatchItem from "./WatchItem";

const WatchList = ({ watched, onHandleDelete }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchItem key={movie.imdbID} movie={movie} onDelete={onHandleDelete} />
      ))}
    </ul>
  );
};

export default WatchList;
