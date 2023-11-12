import { useEffect, useState } from "react";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import WatchList from "./components/WatchList";
import WatchedSummary from "./components/WatchedSummary";
import { tempMovieData, tempWatchedData } from "./data";
import "./index.css";
import SelectedMovie from "./components/SelectedMovie";
const KEY = "2e88268e";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelect(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleMovieClose() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function deleteMovie(id) {
    setWatched((watched) => watched.filter((watch) => watch.imdbID !== id));
  }
  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=e9f7880&s=${query}`
          );
          if (!response.ok) {
            throw new Error(
              "something went wrong please check your connection"
            );
          }
          const data = await response.json();
          setMovies(data.Search);
        } catch (err) {
          console.log(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
          setError("");
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchData();
    },
    [query]
  );

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <main className="main">
        <Box>
          {!isLoading && !error && (
            <MoviesList movies={movies} onHandleSelect={handleSelect} />
          )}
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onHandleClose={handleMovieClose}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchList watched={watched} onHandleDelete={deleteMovie} />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
