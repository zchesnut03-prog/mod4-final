import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_KEY`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}
