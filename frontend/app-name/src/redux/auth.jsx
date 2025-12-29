import { createSlice } from "@reduxjs/toolkit";
export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userid: localStorage.getItem("userid") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },

  reducers: {
    login: (state, action) => {
      (state.token = action.payload),
        localStorage.setItem("token", action.payload),
        (state.isLoggedIn = true);
    },
    setUserId: (state, action) => {
      state.userid = action.payload,
      localStorage.setItem("userId",action.payload)
    },
    logout:(state)=>{
        state.token=null,
        state.userid=null,
        state.isLoggedIn=false,
        localStorage.clear()
    }
  },
});
 export const {login,logout,setUserId} = auth.actions
 export default auth.reducer