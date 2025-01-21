//layout/setting.tsx
import React, { useState } from 'react';
import { Button, Flex, Drawer, Space, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { setShowSetting, setIsDark, setIsRadius, setColorPrimary } from '@/store/baseSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const colors = [
	{
		name: '拂晓蓝',
		value: '#1677ff',
	},
	{
		name: '薄暮',
		value: '#5f80c7',
	},
	{
		name: '日暮',
		value: '#faad14',
	},
	{
		name: '火山',
		value: '#f5686f',
	},
	{
		name: '酱紫',
		value: '#9266f9',
	},
	{
		name: '极光绿',
		value: '#3c9',
	},
	{
		name: '极客蓝',
		value: '#32a2d4',
	},
];
const Setting = () => {
	const dispatch = useDispatch();
	const store = useSelector((state: any) => state.base);
	const onChangeDark = () => {
		dispatch(setIsDark());
	};
	const onChangeRadius = () => {
		dispatch(setIsRadius());
	};
	const handlesetCurColor = (color: string) => {
		dispatch(setColorPrimary(color));
	};
	const onClose = () => {
		dispatch(setShowSetting(false));
	};
	const ColorItem: React.FC<{ color: string; isSelectd: boolean }> = ({ color, isSelectd }) => {
		if (isSelectd) {
			return (
				<div className="w-20 h-20 flex justify-center items-center  rounded-2 cursor-pointer items" style={{ background: color }}>
					<CheckOutlined style={{ color: '#fff' }} />
				</div>
			);
		} else {
			return (
				<div
					className="w-20 h-20 flex justify-center items-center  rounded-2 cursor-pointer items"
					style={{ background: color }}
					onClick={() => handlesetCurColor(color)}
				></div>
			);
		}
	};
	return (
		<Drawer
			title="设置"
			width={300}
			closeIcon={false}
			open={store.showSetting}
			extra={
				<Space>
					<Button type="text" onClick={onClose} icon={<CloseOutlined />}></Button>
				</Space>
			}
		>
			<div className="mb-3 font-bold">主题颜色</div>
			<Flex gap="middle" justify="space-between" align="center">
				{colors.map((item) => (
					<ColorItem key={item.value} color={item.value} isSelectd={store.colorPrimary == item.value} />
				))}
			</Flex>
			<div className="mb-3 mt-3 font-bold">主题模式</div>
			<div className="flex justify-between mb-3">
				<div className="flex gap-2">
					<span>开启暗黑模式</span>
				</div>
				<div className="flex gap-2">
					<Switch defaultChecked checked={store.isDark} onChange={onChangeDark} />
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex gap-2">
					<span>开启圆角主题</span>
				</div>
				<div className="flex gap-2">
					<Switch defaultChecked checked={store.isRadius} onChange={onChangeRadius} />
				</div>
			</div>
		</Drawer>
	);
};

export default Setting;
