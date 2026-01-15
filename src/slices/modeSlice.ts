// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   darkMode: localStorage.getItem("darkMode") ? JSON.parse(localStorage.getItem("darkMode") as string) : false,
// };

import { createAction, createSlice } from "@reduxjs/toolkit";

export const requestSetMode = createAction<boolean>("mode/requestSetMode");

const initialState = {
  darkMode: localStorage.getItem("darkMode") ? JSON.parse(localStorage.getItem("darkMode") as string) : false,
};

const modeSlice = createSlice({
  name:"mode",
  initialState: initialState,
  reducers:{
    setMode:(state,value)=>{
      state.darkMode = value.payload;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));   
    }
  }
})


export const {setMode}= modeSlice.actions;
export default modeSlice.reducer;