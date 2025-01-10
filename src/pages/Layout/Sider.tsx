//sider.tsx
import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import { toggleCollapsed } from '@/store/baseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import AppMenu from './Menu.tsx';
import { getMenuList } from '@/api/menu.ts';
import { MenuItem } from '@/types/menu.ts';
const { Sider } = Layout;
const AppSider = () => {
	const collapsed = useSelector((state: any) => state.base.collapsed);
	const dispatch = useDispatch();
	const [menus, setMenus] = useState<MenuItem[]>([]);
	useEffect(() => {
		getMenuList().then((res) => {
			setMenus(res.data || []);
		});
	}, []);
	return (
		<Sider style={{ minHeight: '100vh' }} trigger={null} collapsible collapsed={collapsed} onCollapse={() => dispatch(toggleCollapsed())}>
			<AppMenu menu={menus} />
		</Sider>
	);
};
export default AppSider;
