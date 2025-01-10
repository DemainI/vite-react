import { createSlice } from '@reduxjs/toolkit';
interface GlobalState {
	collapsed: boolean; //是否折叠
	showSetting: boolean; //是否显示设置
	colorPrimary: string; //主题颜色
	isDark: boolean; //是否暗黑模式
	isRadius: boolean; //是否圆角
}
const setLocal = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};
const getLocal = (key: string) => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

const initialState: GlobalState = {
	collapsed: false,
	showSetting: false,
	colorPrimary: getLocal('colorPrimary') || '#1677ff',
	isDark: getLocal('isDark') || false,
	isRadius: getLocal('isRadius') || false,
};
const baseSlice = createSlice({
	name: 'base',
	initialState,
	reducers: {
		toggleCollapsed: (state) => {
			state.collapsed = !state.collapsed;
		},
		setShowSetting: (state, action) => {
			// 更新设置状态为 action 载荷
			state.showSetting = action.payload;
		},
		setIsDark: (state) => {
			// 更新暗黑模式状态
			state.isDark = !state.isDark;
			setLocal('isDark', state.isDark);
		},
		setColorPrimary: (state, action) => {
			// 更新主题颜色为 action 载荷
			state.colorPrimary = action.payload;
			setLocal('colorPrimary', state.colorPrimary);
		},
		setIsRadius: (state) => {
			// 更新圆角状态
			state.isRadius = !state.isRadius;
			setLocal('isRadius', state.isRadius);
		},
	},
});
export const { toggleCollapsed, setShowSetting, setIsDark, setColorPrimary, setIsRadius } = baseSlice.actions;
export default baseSlice.reducer;
