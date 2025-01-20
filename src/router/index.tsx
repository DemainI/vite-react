import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Counter = lazy(() => import('../pages/Counter.tsx'));
const NetMap = lazy(() => import('../pages/NetMap.tsx'));
const VirtualList = lazy(() => import('../pages/VirtualList.tsx'));
const Error = lazy(() => import('../pages/Error.tsx'));
const AppLayout = lazy(() => import('../pages/Layout/index.tsx'));
const Home = lazy(() => import('@/pages/Home'));
const Role = lazy(() => import('@/pages/Setting/Role'));
const User = lazy(() => import('@/pages/Setting/User'));
const Category = lazy(() => import('@/pages/Shop/Category.tsx'));
const Product = lazy(() => import('@/pages/Shop/Product.tsx'));
const OrderDetail = lazy(() => import('@/pages/Shop/OrderDetail.tsx'));
const OrderList = lazy(() => import('@/pages/Shop/orderList.tsx'));
// 按需引入导致报错：懒加载模式的组件写法，外面需要套一层 Loading 的提示加载组件
const withLoadingComponent = (comp: JSX.Element) => <Suspense fallback={<>Loading</>}>{comp}</Suspense>;
const routes = [
	{
		path: '/',
		element: withLoadingComponent(<AppLayout />),
		children: [
			{
				path: '/',
				element: <Navigate to="/home" />,
			},
			{
				path: 'home',
				element: withLoadingComponent(<Home />),
			},
			{
				path: 'setting',
				children: [
					{
						path: 'role',
						element: withLoadingComponent(<Role />),
					},
					{
						path: 'user',
						element: withLoadingComponent(<User />),
					},
				],
			},
			{
				path: '/shop',
				children: [
					{
						path: 'category',
						element: withLoadingComponent(<Category />),
					},
					{
						path: 'product',
						element: withLoadingComponent(<Product />),
					},
					{
						path: 'order',
						children: [
							{
								path: 'orderList',
								element: withLoadingComponent(<OrderList />),
							},
							{
								path: 'orderDetail',
								element: withLoadingComponent(<OrderDetail />),
							},
						],
					},
				],
			},
			{
				path: '/counter',
				element: withLoadingComponent(<Counter />),
			},
			{
				path: '/netMap',
				element: withLoadingComponent(<NetMap />),
			},
			{
				path: '/virtualList',
				element: withLoadingComponent(<VirtualList />),
			},
		],
	},
	{
		path: '*',
		element: withLoadingComponent(<Error />),
	},
];
const router = createBrowserRouter(routes, {
	future: {
		v7_fetcherPersist: true,
		v7_normalizeFormMethod: true,
		v7_partialHydration: true,
		v7_relativeSplatPath: true,
		v7_skipActionErrorRevalidation: true,
	},
});
export default router;
