import { useState, useEffect } from "react";

const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [watched, setWatched] = useState([]);

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
  return { movies, isLoading, error };
};

export default useMovies;
