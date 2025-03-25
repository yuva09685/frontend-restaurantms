import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tableReducer from "./slices/tableSlices"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tables: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
