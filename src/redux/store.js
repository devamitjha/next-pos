import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import sheetReducer from "@/redux/slices/sheetSlice";
import selectedStoreReducer from "@/redux/slices/selectedStoreSlice"; 
import productImageReducer from "@/redux/slices/productImageSlice";
import cartReducer from "@/redux/slices/cartSlice";
import productReducer from "@/redux/slices/productSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["agent", "user", "cart", "selectedStore"], // ONLY these slices will persist
};

const rootReducer = combineReducers({ 
  sheet: sheetReducer,
  selectedStore: selectedStoreReducer,  
  productImages: productImageReducer, 
  cart: cartReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
