import { useEffect, useRef, useState } from 'react';

const list = [];
for (let i = 0; i < 1000; i++) {
	list.push({
		id: i,
		content: '我是列表 ' + i,
	});
}

function App() {
	const [start, setStart] = useState(0); // 列表起始位置
	const [end, setEnd] = useState(20); // 列表中止位置
	const topEl = useRef();
	const bottomEl = useRef();
	const emptyRef = useRef();

	const buffer = 5; // 缓冲数据
	const itemHeight = 50; // 每一项高度
	const total = 10000; // 数据总数
	const height = itemHeight * total; // 列表总高度

	useEffect(() => {
		const ob = new IntersectionObserver(callback);
		// 分别观察开头和结尾的元素
		if (topEl.current) {
			ob.observe(topEl.current);
		}

		if (bottomEl.current) {
			ob.observe(bottomEl.current);
		}

		return () => {
			ob && ob.unobserve(topEl.current);
			ob && ob.unobserve(bottomEl.current);
		};
	}, [end]);

	const callback = (entries) => {
		entries.forEach((entry) => {
			// entry.isIntersecting = true or entry.intersectionRatio > 0 进入可视区域
			const maxEndIndex = list.length - 1;

			// 鼠标向上滚动
			if (entry.isIntersecting && entry.target.id == 'top') {
				const newStart = Math.max(start - buffer, 0);
				const newEnd = Math.min(start + 20, maxEndIndex);
				setStart(newStart);
				setEnd(newEnd);
			}
			// 鼠标向下滚动
			if (entry.isIntersecting && entry.target.id == 'bottom') {
				const newStart = Math.max(end - 20, 0);
				const newEnd = Math.min(end + buffer, maxEndIndex);
				setStart(newStart);
				setEnd(newEnd);
			}
		});
	};

	// 初始化
	const virtualList = list.slice(start, end);
	const lastIndex = virtualList.length - 1;

	return (
		<div className="virtual-list">
			<div className="virtual-list-container" style={{ height: height + 'px' }}>
				{virtualList.length &&
					virtualList.map((item, index) => {
						const refVal = index == 0 ? topEl : index == lastIndex ? bottomEl : emptyRef;
						const id = index === 0 ? 'top' : index === lastIndex ? 'bottom' : '';
						const top = itemHeight * (index == 0 ? start : index == virtualList.length - 1 ? end - 1 : start + index);

						return (
							<span ref={refVal} style={{ height: itemHeight + 'px', top: top + 'px' }} key={item.id} id={id}>
								{item.content}
							</span>
						);
					})}
			</div>
		</div>
	);
}

export default App;
