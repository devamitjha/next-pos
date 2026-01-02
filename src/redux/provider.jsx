"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "./store";
import "react-toastify/dist/ReactToastify.css";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        theme="light"
      />
    </Provider>
  );
}
