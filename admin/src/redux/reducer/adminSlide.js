import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedKey: '1',
};

export const adminSlide = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addSelectedKey: (state, action) => {
      const { selectedKey = '' } = action.payload;
      state.selectedKey = selectedKey || state.selectedKey;
    },
  },
});

export const { addSelectedKey } = adminSlide.actions;

export default adminSlide.reducer;
