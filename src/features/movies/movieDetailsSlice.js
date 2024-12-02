import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieDetails, fetchMovieCast } from "../../api/movieApi";

export const fetchMovieData = createAsyncThunk(
  "movieDetails/fetchMovieData",
  async (id) => {
    const movieDetails = await fetchMovieDetails(id);
    const castDetails = await fetchMovieCast(id);
    return { movieDetails, castDetails: castDetails.cast };
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movie: null,
    cast: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload.movieDetails;
        state.cast = action.payload.castDetails;
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieDetailsSlice.reducer;
