import { createBrowserRouter } from 'react-router-dom';
import Counter from '../pages/Counter.tsx';
import Debounce from '../pages/Debounce.tsx';
import Intersection from '../pages/IntersectionVirtualList.tsx';
import NetMap from '../pages/NetMap.tsx';
import VirtualList from '../pages/VirtualList.tsx';
import Test from '../pages/Test.tsx';
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
				path: '/debounce',
				element: <Debounce />,
			},
			{
				path: '/intersection',
				element: <Intersection />,
			},
			{
				path: '/netMap',
				element: <NetMap />,
			},
			{
				path: '/virtualList',
				element: <VirtualList />,
			},
			{
				path: '/test',
				element: <Test />,
			},
		],
	},
];
const router = createBrowserRouter(routes);
export default router;
