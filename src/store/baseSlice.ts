import { createSlice } from '@reduxjs/toolkit';

const baseSlice = createSlice({
	name: 'base',
	initialState: {
		collapsed: false,
	},
	reducers: {
		toggleCollapsed: (state) => {
			state.collapsed = !state.collapsed;
		},
	},
});
export const { toggleCollapsed } = baseSlice.actions;
export default baseSlice.reducer;
