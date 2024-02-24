import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.name = state.name === "dark" ? "garden" : "dark";
      localStorage.setItem("theme", state.name);
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
