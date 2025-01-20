//sider.tsx
import { Layout } from 'antd';
import { toggleCollapsed } from '@/store/baseSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import AppMenu from './Menu.tsx';
const { Sider } = Layout;
const AppSider = () => {
	const collapsed = useSelector((state: any) => state.base.collapsed);
	const dispatch = useDispatch();
	return (
		<Sider className="overflow-y-auto" trigger={null} collapsible collapsed={collapsed} onCollapse={() => dispatch(toggleCollapsed())}>
			<AppMenu />
		</Sider>
	);
};
export default AppSider;
