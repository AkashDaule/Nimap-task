import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMoviesApi } from "../../api/movieApi";

// Thunk for fetching movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (page) => {
  const data = await fetchMoviesApi(page);
  return data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = movieSlice.actions;

export default movieSlice.reducer;
