import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/movieSlice";
import topRatedReducer from "./features/movies/topRatedSlice";
import upcomingReducer from "./features/movies/upcomingSlice";


export const store = configureStore({
  reducer: {
    movies: movieReducer,
    TopRated: topRatedReducer,
    upcomingMovies: upcomingReducer,
  },
});

export default store;
