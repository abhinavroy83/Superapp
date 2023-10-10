import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    // Add other reducers here if i have more slices
  },
});
