import { createSlice } from "@reduxjs/toolkit";

const categorysSlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    setCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategory } = categorysSlice.actions;
export default categorysSlice.reducer;
