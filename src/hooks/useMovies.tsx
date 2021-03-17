import { createContext, useContext, useEffect, useState } from "react";

import { api } from '../services/api';

interface MoviesContextProps {
  genres: GenreResponseProps[],
  movies: MovieProps[],
  selectedGenre: GenreResponseProps,
  selectedGenreId: number,
  handleClickButton: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export const MoviesContext = createContext({} as MoviesContextProps);

const MoviesProvider: React.FC = ({ children }) => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response: any) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then((response: any) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then((response: any) => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider value={{
      genres,
      movies,
      selectedGenre,
      selectedGenreId,
      handleClickButton,
    }}>
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw Error('MoviesContext must be inside a MoviesProvider');
  }

  const {
    genres,
    movies,
    selectedGenre,
    selectedGenreId,
    handleClickButton,
  } = context;

  return {
    genres,
    movies,
    selectedGenre,
    selectedGenreId,
    handleClickButton,
  }
}

export default MoviesProvider;