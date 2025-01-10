import { createBrowserRouter, Navigate } from 'react-router-dom';
import Counter from '../pages/Counter.tsx';
import NetMap from '../pages/NetMap.tsx';
import VirtualList from '../pages/VirtualList.tsx';
import Error from '../pages/Error.tsx';
import AppLayout from '../pages/Layout/index.tsx';
import Home from '@/pages/Home';
import Role from '@/pages/Setting/Role';
import User from '@/pages/Setting/User';
import Category from '@/pages/Shop/Category.tsx';
import Product from '@/pages/Shop/Product.tsx';
import Order from '@/pages/Shop/Order.tsx';

const routes = [
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Navigate to="/home" />,
			},
			{
				path: 'home',
				element: <Home />,
			},
			{
				path: 'setting',
				children: [
					{
						path: 'role',
						element: <Role />,
					},
					{
						path: 'user',
						element: <User />,
					},
				],
			},
			{
				path: '/shop',
				children: [
					{
						path: 'category',
						element: <Category />,
					},
					{
						path: 'product',
						element: <Product />,
					},
					{
						path: 'order',
						element: <Order />,
					},
				],
			},
			{
				path: '/counter',
				element: <Counter />,
			},
			{
				path: '/netMap',
				element: <NetMap />,
			},
			{
				path: '/virtualList',
				element: <VirtualList />,
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
];
const router = createBrowserRouter(routes);
export default router;
