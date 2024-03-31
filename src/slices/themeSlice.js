import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("theme") || "garden",
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
