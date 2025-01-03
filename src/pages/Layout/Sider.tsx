//sider.tsx
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { toggleCollapsed } from '@/store/baseSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const { Sider } = Layout;
const AppSider = () => {
	const collapsed = useSelector((state: any) => state.base.collapsed);
	const dispatch = useDispatch();
	return (
		<Sider style={{ minHeight: '100vh' }} trigger={null} collapsible collapsed={collapsed} onCollapse={() => dispatch(toggleCollapsed())}>
			<Menu
				theme="dark"
				mode="inline"
				style={{ height: '100%' }}
				defaultSelectedKeys={['1']}
				items={[
					{
						key: '1',
						icon: <UserOutlined />,
						label: 'nav 1',
					},
					{
						key: '2',
						icon: <VideoCameraOutlined />,
						label: 'nav 2',
					},
					{
						key: '3',
						icon: <UploadOutlined />,
						label: 'nav 3',
					},
				]}
			/>
		</Sider>
	);
};
export default AppSider;
