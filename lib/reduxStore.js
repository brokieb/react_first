import { configureStore } from '@reduxjs/toolkit';
import cartItemsCounterReducer from '../features/counter/counterSlice';
export default configureStore({
	reducer: {
		counter: cartItemsCounterReducer,
	},
});
