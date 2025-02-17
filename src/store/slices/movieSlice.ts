
import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name: "movies", 
    initialState: {
        popular: [],
        toprated: [],
        latest: [],
        upcoming: []
    },
    reducers: {
        setMovies: (state, action) => {
            state.popular = action.payload.popular;
            state.toprated = action.payload.toprated;
            state.latest = action.payload.latest;
            state.upcoming = action.payload.upcoming;
        }
    },
  });

  export const { setMovies } = movieSlice.actions;

  export default  movieSlice.reducer;