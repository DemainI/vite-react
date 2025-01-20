import React, { useEffect, useState } from 'react';
import { HomeOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { MenuItem } from '@/types/menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectMenuKey, setCurrentPath, addMenu, setOpenMenuKeys } from '@/store/menuSlice';

// 图标映射
const Icons = {
	home: HomeOutlined,
	setting: SettingOutlined,
	shop: ShopOutlined,
};
// 获取图标组件
const IconByName: React.FC<{ iconName: string }> = ({ iconName }) => {
	// 获取图标组件
	const IconComponent = Icons[iconName as keyof typeof Icons];
	// 返回图标组件
	return IconComponent ? <IconComponent /> : null;
};

const AppMenu = () => {
	const [menus, setMenus] = useState<MenuItem[]>([]);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const state = useSelector((store: any) => store.menu);
	useEffect(() => {
		const menuData = handleMenuData(state.menuList);
		setMenus(menuData);
		dispatch(setSelectMenuKey(state.selectMenuKey || [menuData[0]?.key]));
		navigate(location.pathname || menuData[0]?.key);
	}, [state.menuList]);

	const handleMenuData = (menuList: MenuItem[]) => {
		if (!menuList) return [];
		const processMenuItem = (item: MenuItem) => {
			return {
				key: item.key,
				icon: item.icon && <IconByName iconName={item.icon} />,
				label: item.label,
				children: item.children && item.children.map(processMenuItem),
			};
		};
		return menuList.map(processMenuItem);
	};

	const handleMenuTitle = (key: string): string => {
		const findLable = (menuList: MenuItem[]) => {
			for (const item of menuList) {
				if (item.key === key) {
					return item.label;
				} else if (item.children) {
					const result = findLable(item.children);
					if (result) {
						return result;
					}
				}
			}
		};
		return findLable(menus) || '';
	};
	const handleMenuSelect = (e: any) => {
		dispatch(setSelectMenuKey(e?.selectedKeys));
		const targetPath = e?.keyPath?.reverse().join('/');
		if (targetPath) {
			navigate(targetPath);
			dispatch(setCurrentPath(targetPath));
			const selectedKey = e?.selectedKeys[0] || '';
			!['home'].includes(targetPath) && dispatch(addMenu({ key: selectedKey, path: targetPath, title: handleMenuTitle(selectedKey) }));
		}
	};
	return (
		<Menu
			openKeys={state.openMenuKeys}
			onOpenChange={(openKeys: string[]) => dispatch(setOpenMenuKeys(openKeys))}
			theme="dark"
			mode="inline"
			style={{ height: '100%' }}
			selectedKeys={state.selectMenuKey}
			items={menus}
			onSelect={handleMenuSelect}
		/>
	);
};

export default AppMenu;
