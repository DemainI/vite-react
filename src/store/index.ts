import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import base from './baseSlice';
import menuSlice from './baseSlice';
export default configureStore({
	reducer: {
		counter: counterReducer,
		base,
		menu: menuSlice,
	},
});
