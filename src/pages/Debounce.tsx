import React, { useEffect, useState, useRef } from 'react';
import { Switch, Transfer } from 'antd';
import type { TransferProps } from 'antd';

interface RecordType {
	key: string;
	title: string;
	description: string;
	disabled: boolean;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
	key: i.toString(),
	title: `content${i + 1}`,
	description: `description of content${i + 1}`,
	disabled: i % 3 < 1,
}));

const oriTargetKeys = mockData.filter((item) => Number(item.key) % 3 > 1).map((item) => item.key);

const App: React.FC = () => {
	const [targetKeys, setTargetKeys] = useState<React.Key[]>(oriTargetKeys);
	const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
	const [disabled, setDisabled] = useState(false);
	const transRef = useRef<any>(null);

	useEffect(() => {
		console.log('targetKeys', targetKeys);
	}, [targetKeys]);
	const handleChange: TransferProps['onChange'] = (newTargetKeys, direction, moveKeys) => {
		setTargetKeys(newTargetKeys);

		console.log('targetKeys: ', newTargetKeys);
		console.log('direction: ', direction);
		console.log('moveKeys: ', moveKeys);
	};

	const handleSelectChange: TransferProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
		setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
		console.log('sourceSelectedKeys: ', sourceSelectedKeys);
	};

	const handleScroll: TransferProps['onScroll'] = (direction, e) => {
		console.log('direction:', direction);
		console.log('target:', e.target);
	};

	const handleDisable = (checked: boolean) => {
		setDisabled(checked);
	};

	const handleDelte = (item) => {
		console.log(item);
		console.log('transRef.current', transRef.current);
	};

	const renderItem = (item: RecordType) => {
		const customLabel = (
			<span className="custom-item">
				{item.title} <span onClick={() => handleDelte(item)}>X</span>
			</span>
		);

		return {
			label: customLabel, // for displayed item
			value: item.title, // for title and filter matching
		};
	};

	return (
		<>
			<Transfer
				dataSource={mockData}
				titles={['Source', 'Target']}
				targetKeys={targetKeys}
				selectedKeys={selectedKeys}
				onChange={handleChange}
				onSelectChange={handleSelectChange}
				onScroll={handleScroll}
				render={renderItem}
				oneWay
				ref={transRef}
				style={{ marginBottom: 16 }}
			/>
			<Switch unCheckedChildren="disabled" checkedChildren="disabled" checked={disabled} onChange={handleDisable} />
		</>
	);
};

export default App;
