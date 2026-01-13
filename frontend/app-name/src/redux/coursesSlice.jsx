import { createSlice } from "@reduxjs/toolkit";
export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
       addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
  },
});


export const {setCourses ,addCourse }=coursesSlice.actions;
export default coursesSlice.reducer;