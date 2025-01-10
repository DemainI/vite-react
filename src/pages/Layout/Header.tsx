//header.tsx
import { Button, Layout, theme, Flex, Drawer, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, CloseOutlined } from '@ant-design/icons';
import { toggleCollapsed, setShowSetting } from '@/store/baseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Setting from './Setting';
const { Header } = Layout;
const AppHeader = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const collapsed = useSelector((state: any) => state.base.collapsed);
	const dispatch = useDispatch();
	const handleShowPoup = () => {
		dispatch(setShowSetting(true));
	};

	return (
		<Header style={{ padding: 0, background: colorBgContainer }}>
			<Flex align="center" gap="middle" justify="space-between">
				<Button
					type="text"
					icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					style={{
						fontSize: '16px',
						width: 64,
						height: 64,
					}}
					onClick={() => dispatch(toggleCollapsed())}
				/>
				<Button onClick={() => handleShowPoup()} type="primary" className="mr-4" icon={<SettingOutlined />} />
			</Flex>
			<Setting />
		</Header>
	);
};
export default AppHeader;
