import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMovies } from '../../app/store/moviesSlice';
import { RootState } from '../../app/store/store';
import MovieCard from '../movieCard/MovieCard'
import { withRouter } from 'react-router'


function Search() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('Type a Movie Title Here');
  const movies = useAppSelector((state: RootState) => state.movies.movies)  
    
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(fetchMovies(query));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }
    
    return (
        <div>
        <input type="text" value={query} onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
        {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
        ))}
      </div>
  );
}

// export default withRouter(Search);
export default Search;