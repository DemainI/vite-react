import { createBrowserRouter } from 'react-router-dom';
import Counter from '../pages/Counter.tsx';
import NetMap from '../pages/NetMap.tsx';
import VirtualList from '../pages/VirtualList.tsx';
import Error from '../pages/Error.tsx';
import AppLayout from '../pages/Layout/index.tsx';

const routes = [
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
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
];
const router = createBrowserRouter(routes);
export default router;
