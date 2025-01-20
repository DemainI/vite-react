//main.tsx
import { Layout, theme, Tag, Flex, Divider } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { OpenedMenu } from '@/types/menu';
import { setSelectMenuKey, setCurrentPath, removeMenu } from '@/store/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
const { Content } = Layout;
const AppMain = () => {
	const homeTag: OpenedMenu = {
		key: 'home',
		path: '/',
		title: '首页',
	};
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const menuStore = useSelector((state: any) => state.menu);
	const tabList = menuStore.openedMenu;
	const {
		token: { colorBgContainer, borderRadiusLG, colorPrimaryBg, colorPrimary },
	} = theme.useToken();
	const handleTabClick = (item: OpenedMenu) => {
		navigate(item.path || '/');
		dispatch(setCurrentPath(item.path || '/'));
		dispatch(setSelectMenuKey([item.key]));
	};
	const handleTabClose = (key: string) => {
		dispatch(removeMenu(key));
	};
	return (
		<>
			<Divider style={{ margin: 0 }} />
			<Flex gap="0" justify="flex-start" className="bg-white  pl-5 pr-5" align="center">
				<>
					<Tag
						bordered={false}
						icon={<HomeOutlined />}
						style={{
							background: ['/', 'home'].includes(menuStore.selectMenuKey[0]) ? colorPrimaryBg : 'transparent',
							color: ['/', 'home'].includes(menuStore.selectMenuKey[0]) ? colorPrimary : 'rgba(0, 0, 0, 0.88)',
						}}
						onClick={() => handleTabClick(homeTag)}
						className="cursor-pointer flex items-center pt-2  pb-2 pl-4 pr-4 text-base rounded-b-none"
					>
						<span className="mr-1">{homeTag.title}</span>
					</Tag>
				</>
				{tabList?.map((item) => {
					return (
						<Tag
							bordered={false}
							onClick={() => {
								handleTabClick(item);
							}}
							key={item.key}
							closable
							style={{
								background: item.key == menuStore.selectMenuKey[0] ? colorPrimaryBg : 'transparent',
								color: item.key == menuStore.selectMenuKey[0] ? colorPrimary : 'rgba(0, 0, 0, 0.88)',
							}}
							onClose={() => handleTabClose(item.key)}
							className="cursor-pointer flex items-center pt-2 pb-2 pl-4 text-base rounded-b-none"
						>
							<span className="mr-1">{item.title}</span>
						</Tag>
					);
				})}
			</Flex>
			<Content
				style={{
					margin: '24px 16px',
					padding: 24,
					background: colorBgContainer,
					borderRadius: borderRadiusLG,
				}}
				className="flex-auto overflow-auto mx-24 my-16 p-24"
			>
				<Outlet />
			</Content>
		</>
	);
};
export default AppMain;
