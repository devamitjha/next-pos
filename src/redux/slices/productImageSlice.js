import { createSlice } from "@reduxjs/toolkit";

const productImageSlice = createSlice({
  name: "productImages",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchImagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchImagesSuccess: (state, action) => {
      state.images = action.payload;
      state.loading = false;
    },
    fetchImagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearImages: (state) => {
      state.images = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
  clearImages,
} = productImageSlice.actions;

export default productImageSlice.reducer;
