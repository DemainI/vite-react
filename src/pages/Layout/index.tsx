//layout/index.tsx
import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppSider from './Sider';
import Content from './Content';
import store from '@/store';
import { Provider } from 'react-redux';
import { log } from 'console';

const { Footer } = Layout;
const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Layout className="app-layout">
				<AppSider />
				<Layout>
					<AppHeader />
					<Content />
					{/* <Footer style={{ textAlign: "center", height: "50px" }}>Today©{new Date().getFullYear()} Created by Leo</Footer> */}
				</Layout>
			</Layout>
		</Provider>
	);
};

export default App;
