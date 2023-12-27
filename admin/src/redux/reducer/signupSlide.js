import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [],
  keySteps: 0,
};

export const signupSlide = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    addAddresses: (state, action) => {
      const { addresses = [] } = action.payload;
      state.addresses = addresses || state.addresses;
    },
    addKeySteps: (state, action) => {
      const { keySteps = 0 } = action.payload;
      state.keySteps = keySteps;
    },
  },
});

export const { addAddresses, addKeySteps } = signupSlide.actions;

export default signupSlide.reducer;
