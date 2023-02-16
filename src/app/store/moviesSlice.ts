import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails } from '../../types/types';
import { searchMovies, getMovieDetails } from '../../utils/api'
import { RootState, AppThunk } from './store';


interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedMovie: MovieDetails | null;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null,
  selectedMovie: null,
};

export const searchMovie = createAsyncThunk(
  'movies/search',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await searchMovies(searchTerm);
      return response.data.Search;
      } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID: string, { rejectWithValue }) => {
    try {
      const response = await getMovieDetails(imdbID);
      if (response.status === 200) {
        const { data } = response;
        console.log("This is data in the fetchMovieDetails function in moviesSlice.tsx", data);
        if (data.Response === 'True') {
          return data;
        } else {
          throw new Error(data.Error);
        }
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
    reducers: {
      // Action for starting a search
      searchMoviesStart(state) {
        state.status = 'loading';
        state.error = null;
      },
      // Action for successful search results
      searchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
        state.status = 'succeeded';
        state.movies = action.payload;
      },
      // Action for failed search
      searchMoviesFailed(state, action: PayloadAction<string>) {
        state.status = 'failed';
        state.error = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const fetchMovies = (query: string): AppThunk => async (dispatch) => {
    try {
      dispatch(moviesSlice.actions.searchMoviesStart());
      const movies = await searchMovies(query);
      dispatch(moviesSlice.actions.searchMoviesSuccess(movies));
    } catch (error: any) {
      dispatch(moviesSlice.actions.searchMoviesFailed(error.message));
    }
  };

export default moviesSlice.reducer;
export const { searchMoviesStart, searchMoviesSuccess, searchMoviesFailed } = moviesSlice.actions;
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMoviesStatus = (state: RootState) => state.movies.status;
export const selectMoviesError = (state: RootState) => state.movies.error;
export const selectMoviesDetails = (state: RootState) => state.movies.selectedMovie;