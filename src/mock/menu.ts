import Mock from 'mockjs';
import { MenuItem } from '@/types/menu.ts';
// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const items: MenuItem[] = [
	{
		id: Mock.mock('@id'),
		key: 'home',
		icon: 'home',
		label: '首页',
	},
	{
		id: Mock.mock('@id'),
		key: 'setting',
		icon: 'setting',
		label: '系统管理',
		children: [
			{
				key: 'user',
				label: '用户管理',
			},
			{
				key: 'role',
				label: '角色管理',
			},
		],
	},
	{
		id: Mock.mock('@id'),
		key: 'shop',
		icon: 'shop',
		label: '商城管理',
		children: [
			{
				key: 'category',
				label: '商品分类',
			},
			{
				key: 'product',
				label: '商品管理',
			},
			{
				key: 'order',
				label: '订单管理',
			},
		],
	},
];

export default [
	// 用户登录
	{
		url: '/api/menu',
		method: 'GET',
		response: () => {
			return {
				code: 200,
				success: true,
				message: '请求成功。',
				data: items,
			};
		},
	},
];
