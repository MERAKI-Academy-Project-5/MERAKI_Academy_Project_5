import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "./favouriteSlice";

import authReducer from "./auth"
import coursesReducer from "./coursesSlice"
import courseDetailsReducer from "./courseDetailsSlice";
export default configureStore({
  reducer: {
auth:authReducer,
courses:coursesReducer,
 favourite: favouriteReducer,
 courseDetails: courseDetailsReducer
  },
});