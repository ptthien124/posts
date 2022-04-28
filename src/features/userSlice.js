import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },

    addAllUsers: (state, action) => [...state, ...action.payload],

  },
});

const { reducer, actions } = user;
export const { addAllUsers, addUser } = actions;
export default reducer;
