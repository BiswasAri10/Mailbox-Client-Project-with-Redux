import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    userEmail: "",
  },
  reducers: {
    Login: (state, action) => {
      state.userEmail = action.payload.email;
      state.isAuth = true;
    },
    Logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice.reducer;
