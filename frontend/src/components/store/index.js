import { configureStore } from "@reduxjs/toolkit";
import authReduser from "./auth"

const store = configureStore({
  reducer: {
    auth:authReduser,
  },
});

export default store;
