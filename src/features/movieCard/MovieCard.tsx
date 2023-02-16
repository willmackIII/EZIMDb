import React from 'react';
import { Movie } from '../../types/types'
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router'


interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const history = useHistory();

  const handleMovieClick = () => {
    history.push(`/movie-details/${movie.imdbID}`);
  }

  return (
    // <Link to={`/movie-details/${movie.imdbID}`}>
    <div onClick={handleMovieClick}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <h5>{movie.imdbID}</h5>
    </div>
  // </Link>
  );
};

export default MovieCard;
// export default withRouter(MovieCard);