import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice"

const Store = configureStore({
  reducer: {
    Auth: AuthSliceReducer,
    
  },
});
export default Store;
