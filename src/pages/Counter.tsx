import { useState } from 'react';

export default function Counter() {
	const [count, setCount] = useState(0);

	// 定义一个函数
	function handle() {
		// setCount(count + 1)
		// 设置延时，延时时间为0毫秒
		setTimeout(() => {
			console.log('count', count);
			// setCount(count + 2)
			// 设置延时，延时时间为0毫秒
			setCount((count) => count + 2);
		}, 0);
	}

	return (
		<div>
			<div>{count}</div>
			<button onClick={handle}>递增</button>
		</div>
	);
}
