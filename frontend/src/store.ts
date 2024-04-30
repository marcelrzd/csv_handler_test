import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./features/api/apiSlice";
import invoiceReducer from "./features/api/invoiceSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    invoice: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
