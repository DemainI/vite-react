//main.tsx
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;
const AppMain = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Content
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: '86%',
				background: colorBgContainer,
				borderRadius: borderRadiusLG,
			}}
		>
			<Outlet />
		</Content>
	);
};
export default AppMain;
