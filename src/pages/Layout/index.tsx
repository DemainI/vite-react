//layout/index.tsx
import React, { useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import AppHeader from './Header';
import AppSider from './Sider';
import Content from './Content';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuList } from '@/api/menu.ts';
import { setMenuList } from '@/store/menuSlice';
const { Footer } = Layout;
const App: React.FC = () => {
	const baseStore = useSelector((state: any) => state.base);
	const dispatch = useDispatch();
	useEffect(() => {
		getMenuList().then((res) => {
			dispatch(setMenuList(res.data || []));
		});
	}, []);
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
				<Layout style={{ overflowY: 'auto' }} className="flex flex-col">
					<AppHeader />
					<Content />
					<Footer style={{ textAlign: 'center', height: '30px' }}>Today©{new Date().getFullYear()} Created by Leo</Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default App;
