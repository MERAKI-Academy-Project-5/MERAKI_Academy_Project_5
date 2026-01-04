import { createSlice } from "@reduxjs/toolkit";
export const courseDetailsSlice = createSlice({
  name: "courseDetails",
  initialState: {
    courseId: 0,
  },
  reducers: {
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
  },
});


export const {setCourseId}=courseDetailsSlice.actions;
export default courseDetailsSlice.reducer;