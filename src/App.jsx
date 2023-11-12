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
const KEY = "2e88268e";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const queryURL = "interstellar";
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
      if (!query.length) {
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
          {!isLoading && !error && <MoviesList movies={movies} />}
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchList watched={watched} />
        </Box>
      </main>
    </>
  );
}
