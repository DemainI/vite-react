import React, { useEffect, useState } from 'react';
import { HomeOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { MenuItem } from '@/types/menu';
import { useNavigate, useLocation } from 'react-router-dom';

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

const AppMenu: React.FC<{ menu: MenuItem[] }> = ({ menu }) => {
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const [menus, setMenus] = useState<MenuItem[]>([]);
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		const menuList: any[] = menu.map((item: MenuItem) => {
			return {
				key: item.key,
				icon: item.icon && <IconByName iconName={item.icon} />,
				label: item.label,
				children:
					item.children &&
					item.children.map((child: MenuItem) => ({
						key: child.key,
						icon: child.icon && <IconByName iconName={child.icon} />,
						label: child.label,
					})),
			};
		});
		setMenus(menuList);
		setSelectedKeys(JSON.parse(sessionStorage.getItem('siderMenuKey') || '') || [menuList[0]?.key]);
		navigate(location.pathname || menuList[0]?.key);
	}, [menu]);
	const handleMenuClick = (e: any) => {
		const targetPath = e?.keyPath?.reverse().join('/');
		targetPath && navigate(targetPath);
	};
	const handleMenuSelect = (e: any) => {
		setSelectedKeys(e?.selectedKeys);
		sessionStorage.setItem('siderMenuKey', JSON.stringify(e?.selectedKeys) || 'null');
	};

	return (
		<Menu
			theme="dark"
			mode="inline"
			style={{ height: '100%' }}
			selectedKeys={selectedKeys}
			items={menus}
			onClick={handleMenuClick}
			onSelect={handleMenuSelect}
		/>
	);
};

export default AppMenu;
