import { configureStore } from "@reduxjs/toolkit";
import cartItemsCounterReducer from "../../app/features/counter/counterSlice";
export default configureStore({
  reducer: {
    counter: cartItemsCounterReducer,
  },
});
