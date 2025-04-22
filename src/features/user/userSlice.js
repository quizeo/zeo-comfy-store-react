import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getUserLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const getThemeLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const initialState = {
  user: getUserLocalStorage(),
  theme: getThemeLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logout successfully");
    },
    toggleTheme: (state) => {
      const { winter, dracula } = themes;
      state.theme = state.theme == dracula ? winter : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
