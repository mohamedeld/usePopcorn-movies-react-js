import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const SelectedMovie = ({ selectedId, onHandleClose }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovie() {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=e9f7880&i=${selectedId}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovie();
    },
    [selectedId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <header>
            <button className="btn-black" onClick={onHandleClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={22} color={"#FFFF00"} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default SelectedMovie;
