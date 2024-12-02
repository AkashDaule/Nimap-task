import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTopRatedMovies } from "../../api/movieApi";

export const fetchTopRated = createAsyncThunk(
  "topRated/fetchTopRated",
  async (page, { rejectWithValue }) => {
    try {
      const data = await fetchTopRatedMovies(page);
      return { movies: data.results, totalPages: data.total_pages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  movies: [],
  totalPages: 1,
  loading: false,
  error: null,
};

const topRatedSlice = createSlice({
  name: "topRated",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies; // Ensure this is assigned
        state.totalPages = action.payload.totalPages; // Ensure this is assigned
      })
      .addCase(fetchTopRated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topRatedSlice.reducer;
