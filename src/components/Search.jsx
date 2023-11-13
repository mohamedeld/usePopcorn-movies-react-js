import { useRef } from "react";
import { useKey } from "../hooks/useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);
  useKey("enter", function () {
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    setQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
