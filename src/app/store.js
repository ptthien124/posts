import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import userReducer from "../features/userSlice";

const rootReducer = {
  posts: postReducer,
  users: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
