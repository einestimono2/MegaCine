import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducer/adminSlide";

const rootReducer = combineReducers({
  admin: adminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
