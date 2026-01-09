import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "c24179a6";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
    )
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <img src={movie.Poster} alt={movie.Title} />
      <h1>{movie.Title}</h1>
      <p><strong>Year:</strong> {movie.Year}</p>
      <p>{movie.Plot}</p>
    </div>
  );
}

export default MovieDetails;
