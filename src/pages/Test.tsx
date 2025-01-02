import React, { useEffect, useState } from 'react';
import { theme, Transfer, Tree } from 'antd';
import type { GetProp, TransferProps, TreeDataNode } from 'antd';
import { increment } from '@/store/counterSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { log } from 'console';

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];

interface TreeTransferProps {
	dataSource: TreeDataNode[];
	targetKeys: TransferProps['targetKeys'];
	onChange: TransferProps['onChange'];
}

// Customize Table Transfer
const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) => selectedKeys.includes(eventKey);

const generateTree = (treeNodes: TreeDataNode[] = [], checkedKeys: TreeTransferProps['targetKeys'] = []): TreeDataNode[] =>
	treeNodes.map(({ children, ...props }) => ({
		...props,
		disabled: checkedKeys.includes(props.key as string),
		children: generateTree(children, checkedKeys),
	}));

const TreeTransfer: React.FC<TreeTransferProps> = ({ dataSource, targetKeys = [], ...restProps }) => {
	const { token } = theme.useToken();

	const transferDataSource: TransferItem[] = [];
	function flatten(list: TreeDataNode[] = []) {
		list.forEach((item) => {
			transferDataSource.push(item as TransferItem);
			flatten(item.children);
		});
	}
	function checkNetworkStatus() {
		if (navigator.onLine) {
			console.log('网络连接正常');
		} else {
			console.log('网络连接中断');
		}
	}

	window.addEventListener('online', checkNetworkStatus);
	window.addEventListener('offline', checkNetworkStatus);

	flatten(dataSource);
	const count = useSelector((state: any) => state.counter.value);
	const dispatch = useDispatch();
	useEffect(() => {
		console.log('count', count);
		dispatch(increment());
		console.log('count', count);
	}, []);
	const debounce = (fn, wait) => {
		let timer = null;
		return (...args) => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				fn.apply(this, args);
			}, wait);
		};
	};
	function throttle(fn, delay) {
		let timer;
		return function () {
			const _this = this;
			const args = arguments;
			if (timer) {
				return;
			}
			timer = setTimeout(function () {
				fn.apply(_this, args);
				timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
			}, delay);
		};
	}
	// const throttle = (fn, delay) => {
	//   let timer = null;
	//   return function(...args) {
	//     let context = this;
	//     if(timer) return;
	//     timer = setTimeout(() => {
	//       fn.apply(context, args);
	//       timer = null;
	//     }, delay)
	//   }
	// }
	return (
		<Transfer
			{...restProps}
			targetKeys={targetKeys}
			dataSource={transferDataSource}
			className="tree-transfer"
			render={(item) => item.title!}
			showSelectAll={true}
			showSearch
		>
			{({ direction, onItemSelect, selectedKeys, onItemSelectAll }) => {
				if (direction === 'left') {
					const checkedKeys = [...selectedKeys, ...targetKeys];
					return (
						<div style={{ padding: token.paddingXS }}>
							<Tree
								blockNode
								checkable
								// checkStrictly
								defaultExpandAll
								checkedKeys={checkedKeys}
								treeData={generateTree(dataSource, targetKeys)}
								onCheck={(_, { checked }) => {
									console.log('checked', checked);
									onItemSelectAll(_, checked);
								}}
								// onSelect={(_, { selected }) => {
								//   onItemSelect(_, selected);
								// }}
							/>
						</div>
					);
				}
			}}
		</Transfer>
	);
};

const treeData: TreeDataNode[] = [
	{ key: '0-0', title: '0-0' },
	{
		key: '0-1',
		title: '0-1',
		children: [
			{ key: '0-1-0', title: '0-1-0' },
			{ key: '0-1-1', title: '0-1-1' },
		],
	},
	{ key: '0-2', title: '0-2' },
	{ key: '0-3', title: '0-3' },
	{ key: '0-4', title: '0-4' },
];

const App: React.FC = () => {
	const [targetKeys, setTargetKeys] = useState<TreeTransferProps['targetKeys']>([]);
	const onChange: TreeTransferProps['onChange'] = (keys) => {
		setTargetKeys(keys);
	};
	return <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={onChange} />;
};

export default App;
