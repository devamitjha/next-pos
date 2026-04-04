import { createSlice } from '@reduxjs/toolkit'

const sheetSlice = createSlice({
  name: 'sheet',
  initialState: {
    activeSheet: null, // 'category' | 'login' | 'register'
    isSideCartOpen: false,
    isProductDrawerOpen: false,
    selectedProduct: null,
  },
  reducers: {
    openSheet: (state, action) => {
      state.activeSheet = action.payload
    },
    closeSheet: (state) => {
      state.activeSheet = null
    },
    switchSheet: (state, action) => {
      state.activeSheet = null
    },
    setSheetAfterDelay: (state, action) => {
      state.activeSheet = action.payload
    },
    toggleSideCart: (state) => {
      state.isSideCartOpen = !state.isSideCartOpen
    },
    openProductDrawer: (state, action) => {
      state.selectedProduct = action.payload
      state.isProductDrawerOpen = true
    },
    closeProductDrawer: (state) => {
      state.isProductDrawerOpen = false
      state.selectedProduct = null
    }
  },
})

export const { 
  openSheet, 
  closeSheet, 
  switchSheet, 
  setSheetAfterDelay,
  toggleSideCart,
  openProductDrawer,
  closeProductDrawer
} = sheetSlice.actions
export default sheetSlice.reducer
