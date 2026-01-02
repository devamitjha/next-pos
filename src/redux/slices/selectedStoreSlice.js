import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: null,
};

const selectedStoreSlice = createSlice({
  name: "selectedStore",
  initialState,
  reducers: {
    setSelectedStore: (state, action) => {
      state.store = action.payload;
    },
    clearSelectedStore: (state) => {
      state.store = null;
    },
  },
});

export const { setSelectedStore, clearSelectedStore } = selectedStoreSlice.actions;
export default selectedStoreSlice.reducer;
