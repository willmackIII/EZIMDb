import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMovieDetails } from '../../app/store/moviesSlice';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const dispatch = useAppDispatch();
  const { selectedMovie, status, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(imdbID));
  }, [dispatch, imdbID]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Check out the deets on this flick</h3>
      <h2>{selectedMovie?.Title}</h2>
      <p>{selectedMovie?.Plot}</p>
      <p>Director: {selectedMovie?.Director}</p>
      <p>Released: {selectedMovie?.Released}</p>
      <p>IMDB Rating: {selectedMovie?.imdbRating}</p>
    </div>
  );
};

export default MovieDetails;