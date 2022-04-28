import { createSlice } from "@reduxjs/toolkit";

const post = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },

    addAllPosts: (state, action) => [...state, ...action.payload],

  },
});

const { reducer, actions } = post;
export const { addAllPosts, addPost } = actions;
export default reducer;
