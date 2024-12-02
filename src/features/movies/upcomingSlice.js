// features/movies/upcomingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUpcomingMovies } from '../../api/movieApi'; // Import the fetchUpcomingMovies function

// Thunk for fetching upcoming movies
export const fetchUpcomingMoviesThunk = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async (page) => {
    const data = await fetchUpcomingMovies(page); // Call the API function
    return data; // Return the fetched data to be handled by the slice
  }
);

const upcomingSlice = createSlice({
  name: 'upcomingMovies',
  initialState: {
    movies: [],          // Movies data (array)
    currentPage: 1,      // Current page for pagination
    totalPages: 1,       // Total number of pages
    loading: false,      // Loading state
    error: null,         // Error state
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; // Set the current page
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMoviesThunk.pending, (state) => {
        state.loading = true;   // Set loading state to true when fetching
        state.error = null;     // Reset error state
      })
      .addCase(fetchUpcomingMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;  // Set loading state to false after success
        state.movies = action.payload.results; // Store the fetched movie data
        state.totalPages = action.payload.total_pages; // Store the total number of pages
      })
      .addCase(fetchUpcomingMoviesThunk.rejected, (state, action) => {
        state.loading = false;  // Set loading state to false if there's an error
        state.error = action.error.message; // Store the error message
      });
  },
});

export const { setCurrentPage } = upcomingSlice.actions;

export default upcomingSlice.reducer;
