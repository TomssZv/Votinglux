import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: Cookies.get('userData') ? JSON.parse(Cookies.get('userData')?.slice(2)!).username : '',
    admin: false,
    logedIn: Cookies.get('userData') ? JSON.parse(Cookies.get('userData')?.slice(2)!).logedIn : false
  },
  reducers: {
    addData: (state, action) => {
      state.username = action.payload.username;
      state.admin = action.payload.admin;
      state.logedIn = action.payload.logedIn;
    }
  }
});

export const { addData } = userSlice.actions;

export default userSlice.reducer;