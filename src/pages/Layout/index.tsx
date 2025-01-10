//layout/index.tsx
import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import AppHeader from './Header';
import AppSider from './Sider';
import Content from './Content';
import { useSelector } from 'react-redux';
// const { Footer } = Layout;
const App: React.FC = () => {
	const baseStore = useSelector((state: any) => state.base);
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: baseStore.colorPrimary,
					borderRadius: baseStore.isRadius ? 6 : 0,
				},
			}}
		>
			<Layout className="app-layout">
				<AppSider />
				<Layout>
					<AppHeader />
					<Content />
					{/* <Footer style={{ textAlign: "center", height: "50px" }}>Today©{new Date().getFullYear()} Created by Leo</Footer> */}
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default App;
