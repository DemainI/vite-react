import { createSlice } from '@reduxjs/toolkit';
import { MenuState, OpenedMenu } from '@/types/menu';
const initialState: MenuState = {
	openedMenu: [],
	openMenuKey: [],
	selectMenuKey: [],
	currentPath: '',
};
const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setOpenKey(state, action) {
			const oldKeys = state.openMenuKey;
			const keys = action.payload;
			const isSame = keys.every((item: string, index: number) => item === oldKeys[index]);
			const flag = keys.length === oldKeys.length && isSame;
			if (flag) {
				return state;
			}
			return { ...state, openMenuKey: keys };
		},
		setCurrentPath(state, action) {
			const keys = action.payload;
			if (state.selectMenuKey[0] === keys[0]) {
				return state;
			}
			const openedMenu = [...state.openedMenu];
			const useCurrentPath = openedMenu.find((item: OpenedMenu) => item.key === keys[0]);
			return {
				...state,
				selectMenuKey: keys,
				currentPath: useCurrentPath?.path || '/',
			};
		},
		addMenu(state, action) {
			const menuItem = action.payload;
			if (state.openedMenu.find((item) => item.path === menuItem.path)) {
				return state;
			} else {
				const openedMenu = [...state.openedMenu];
				const currentPath = menuItem.path;
				openedMenu.push(menuItem);
				return { ...state, openedMenu, currentPath };
			}
		},
		removeMenu(state, action) {
			const keys = action.payload;
			const openedMenu = state.openedMenu.filter((i) => !keys.includes(i.key));
			const currentPath = openedMenu.length > 0 ? openedMenu[openedMenu.length - 1].path : '/';
			if (state.openedMenu.length === openedMenu.length) {
				return state;
			}
			return { ...state, openedMenu, currentPath };
		},
		clearMenu(state) {
			const currentPath = '';
			const openedMenu: OpenedMenu[] = [];
			return { ...state, openedMenu, currentPath };
		},
	},
});

export const { setCurrentPath, setOpenKey, addMenu, removeMenu, clearMenu } = menuSlice.actions;
export default menuSlice.reducer;
