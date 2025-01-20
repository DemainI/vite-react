//header.tsx
import { Button, Layout, theme, Flex, Breadcrumb } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { toggleCollapsed, setShowSetting } from '@/store/baseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@/types/menu';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Setting from './Setting';
import { setSelectMenuKey, setCurrentPath } from '@/store/menuSlice';
const { Header } = Layout;
interface BreadcrumbItem {
	title: React.ReactNode;
	href?: string;
}
const AppHeader = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const collapsed = useSelector((state: any) => state.base.collapsed);
	const menuList = useSelector((store: any) => store.menu.menuList);
	const currentPath = useSelector((store: any) => store.menu.currentPath);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [BreadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
	useEffect(() => {
		setBreadcrumbItems(setMenuData(menuList, currentPath));
	}, [menuList, currentPath]);
	const handleShowPoup = () => {
		dispatch(setShowSetting(true));
	};
	const setMenuData = (arr: MenuItem[], currPath: string) => {
		const menuList: BreadcrumbItem[] = [{ title: <HomeOutlined />, href: '/' }];
		const pathParts = currPath.split('/').filter((part) => part !== '');
		if (pathParts.length === 0) {
			return menuList; // 处理边界条件
		}
		const buildBreadcrumb = (items: MenuItem[], pathIndex: number) => {
			if (pathIndex >= pathParts.length) {
				return;
			}
			const currentKey = pathParts[pathIndex];
			const item = items.find((menuItem) => menuItem.key === currentKey);
			if (item) {
				menuList.push({ title: item.label });
				if (item.children) {
					buildBreadcrumb(item.children, pathIndex + 1);
				}
			}
		};
		buildBreadcrumb(arr, 0);
		return menuList;
	};
	const handleLink = (item: BreadcrumbItem) => () => {
		if (item.href) {
			navigate(item.href);
			const hrefList = item.href.split('/');
			const target = item.href === '/' ? 'home' : hrefList[hrefList.length - 1];
			dispatch(setSelectMenuKey([target]));
			dispatch(setCurrentPath(item.href));
		}
	};
	return (
		<Header style={{ padding: 0, background: colorBgContainer }}>
			<Flex align="center" gap="middle" justify="space-between">
				<Flex justify="space-between" align="center">
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
					<Breadcrumb items={BreadcrumbItems} itemRender={(item: any) => <span onClick={handleLink(item)}>{item.title}</span>} />
				</Flex>
				<Button onClick={() => handleShowPoup()} type="primary" className="mr-4" icon={<SettingOutlined />} />
			</Flex>
			<Setting />
		</Header>
	);
};
export default AppHeader;
