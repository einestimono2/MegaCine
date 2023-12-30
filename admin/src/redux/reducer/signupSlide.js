import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [],
  keySteps: 0,
  addTheater: {
    name: '',
    logo: [],
    email: '',
    thumbnails: [],
    description: '',
    hotline: '',
    coordinates: [],
    city: '',
    district: '',
    ward: '',
    detail: '',
  },
  addAccount: {},
  addLogo: '',
  addImages: [],
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
    addTheater: (state, action) => {
      const {
        addTheater = {
          name: '',
          logo: [],
          email: '',
          thumbnails: [],
          description: '',
          hotline: '',
          coordinates: [],
          city: '',
          district: '',
          ward: '',
        },
      } = action.payload;

      state.addTheater = addTheater;
    },
    addLogo: (state, action) => {
      const { addLogo = '' } = action.payload;
      state.addLogo = addLogo;
    },
    addImages: (state, action) => {
      const { addImages = [] } = action.payload;
      state.addImages = addImages;
    },
    addAccount: (state, action) => {
      const { addAccount = {} } = action.payload;
      state.addAccount = addAccount;
    },
  },
});

export const { addAddresses, addKeySteps, addTheater, addLogo, addImages, addAccount, addLocation } =
  signupSlide.actions;

export default signupSlide.reducer;
