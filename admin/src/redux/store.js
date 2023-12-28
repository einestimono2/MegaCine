import { combineReducers, configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducer/adminSlide';
import signupReducer from './reducer/signupSlide';

const rootReducer = combineReducers({
  admin: adminReducer,
  signup: signupReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
