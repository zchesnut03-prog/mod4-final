import { useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "c24179a6";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  async function searchMovies() {
    if (!query) return;

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`
    );
    const data = await res.json();

    if (data.Response === "True") {
      setMovies(data.Search.slice(0, 6));
    }
  }

  return (
    <div>
      <h1>Movie Finder</h1>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies"
      />
      <button onClick={searchMovies}>Search</button>

      <div className="movies-container">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
