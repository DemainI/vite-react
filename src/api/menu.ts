//menu.ts
import request from './request';
import { MenuItem } from '@/types/menu';

// 获取当前用户信息
export const getMenuList = () => {
	return request<MenuItem[]>({
		method: 'GET',
		url: '/menu',
	});
};
