import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: null,
  allStores: [],
};

const selectedStoreSlice = createSlice({
  name: "selectedStore",
  initialState,
  reducers: {
    setSelectedStore: (state, action) => {
      state.store = action.payload;
    },
    setAllStores: (state, action) => {
      state.allStores = action.payload;
    },
    clearSelectedStore: (state) => {
      state.store = null;
      state.allStores = [];
    },
  },
});

export const {
  setSelectedStore,
  setAllStores,
  clearSelectedStore,
} = selectedStoreSlice.actions;

export default selectedStoreSlice.reducer;
