import axios from 'axios';

const API_KEY = '51226534';

export const searchMovies = async (query: string) => {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
  const response = await axios.get(url);

  if (response.status === 200) {
    const data = response.data;
    if (data.Response === 'True') {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  } else {
    throw new Error('Network response was not ok.');
  }
};

export const getMovieDetails = async (imdbID: string) => {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
    const response = await axios.get(url);
    console.log('This is the response object in getMovieDetails in api.ts', response)
    if (response.status === 200) {
        const { data } = response;
      if (data.Response === 'True') {
        return data;
      } else {
        throw new Error(data.Error);
      }
    } else {
      throw new Error('Network response was not ok.');
    }
  };
