import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setTotalCount } = productSlice.actions;
export default productSlice.reducer;
