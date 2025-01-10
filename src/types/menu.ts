export interface MenuItem {
	id?: string;
	key: string;
	icon?: string;
	label: string;
	children?: MenuItem[];
}
export interface OpenedMenu {
	key: string;
	path: string;
	title: string;
}
// 菜单状态属性
export interface MenuState {
	openedMenu: OpenedMenu[];
	openMenuKey: string[];
	selectMenuKey: string[];
	currentPath: string;
}
