//header.tsx
import { Button, Layout, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { toggleCollapsed } from '@/store/baseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
const { Header } = Layout;
const AppHeader = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const collapsed = useSelector((state: any) => state.base.collapsed);
	const dispatch = useDispatch();
	return (
		<Header style={{ padding: 0, background: colorBgContainer }}>
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
		</Header>
	);
};
export default AppHeader;
