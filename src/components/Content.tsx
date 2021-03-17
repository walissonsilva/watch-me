import { useMovies } from "../hooks/useMovies";

import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

export function Content() {
  const {
    selectedGenre,
    movies,
  } = useMovies();

  return (
    <div className="container">
      <Header />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}