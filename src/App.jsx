import { useEffect, useState } from "react";
import Box from "./components/Box";
import Logo from "./components/Logo";
import MoviesList from "./components/MoviesList";
import Nav from "./components/Nav";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import SelectedMovie from "./components/SelectedMovie";
import WatchList from "./components/WatchList";
import WatchedSummary from "./components/WatchedSummary";
import useMovies from "./hooks/useMovies";
import "./index.css";
import useLocalStorage from "./hooks/useLocalStorage";
const KEY = "2e88268e";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorage([], "watched");

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
