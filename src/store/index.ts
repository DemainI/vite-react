import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import base from './baseSlice';
export default configureStore({
	reducer: {
		counter: counterReducer,
		base,
	},
});
