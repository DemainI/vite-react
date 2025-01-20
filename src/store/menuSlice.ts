import { createSlice } from '@reduxjs/toolkit';
import { MenuState } from '@/types/menu';
const setLocalSession = (key: string, value: any) => {
	sessionStorage.setItem(key, JSON.stringify(value));
};
const getLocalSession = (key: string) => {
	const value = sessionStorage.getItem(key);
	return value ? JSON.parse(value) : '';
};
const initialState: MenuState = {
	openedMenu: getLocalSession('openedMenu') || [],
	selectMenuKey: getLocalSession('selectMenuKey') || [],
	currentPath: getLocalSession('currentPath') || '',
	openMenuKeys: getLocalSession('openMenuKeys') || [],
	menuList: [],
};
const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setMenuList(state, action) {
			state.menuList = action.payload;
		},
		setOpenMenuKeys(state, action) {
			state.openMenuKeys = action.payload;
			setLocalSession('openMenuKeys', state.openMenuKeys);
		},
		setSelectMenuKey(state, action) {
			state.selectMenuKey = action.payload;
			setLocalSession('selectMenuKey', action.payload);
		},
		setCurrentPath(state, action) {
			state.currentPath = action.payload;
			setLocalSession('currentPath', action.payload);
		},
		addMenu(state, action) {
			if (state.openedMenu.find((item) => item.key === action.payload.key)) {
				return state;
			}
			state.openedMenu.push(action.payload);
			setLocalSession('openedMenu', state.openedMenu);
		},
		removeMenu(state, action) {
			const targetIndex = state.openedMenu.findIndex((item) => item.key === action.payload);
			if (targetIndex > -1) {
				state.openedMenu.splice(targetIndex, 1);
				setLocalSession('openedMenu', state.openedMenu);
			}
		},
	},
});

export const { setMenuList, setOpenMenuKeys, setCurrentPath, addMenu, removeMenu, setSelectMenuKey } = menuSlice.actions;
export default menuSlice.reducer;
