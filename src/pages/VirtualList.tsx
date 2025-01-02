import React, { useState, useMemo, useEffect, useRef } from 'react';
const VirtualList = () => {
	const [listData] = useState<number[]>(new Array(100).fill(null).map((_, i) => i + 1));
	const [visibleData, setVisibleData] = useState<number[]>([]);
	const [itemSize] = useState<number>(30);
	const [startOffset, setStartOffset] = useState<number>(0);
	const listHeight = useMemo<number>(() => listData.length * itemSize, [listData, itemSize]);
	const containerRef = useRef<HTMLDivElement>(null);
	const visibleCount = useRef<number>(0);
	useEffect(() => {
		if (containerRef.current) {
			visibleCount.current = Math.ceil(containerRef.current?.clientHeight / itemSize);
			const visibleData = listData.slice(0, Math.min(visibleCount.current, listData.length));
			setVisibleData(visibleData);
		}
	}, [containerRef]);
	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const start = Math.floor(scrollTop / itemSize);
		const end = Math.min(Math.floor(scrollTop / itemSize) + visibleCount.current, listData.length);
		setStartOffset(scrollTop - (scrollTop % itemSize));
		const visibleData = listData.slice(start, end);
		setVisibleData(visibleData);
	};
	return (
		<div className="infinite-list-container" ref={containerRef} onScroll={(e) => handleScroll(e)}>
			<div className="infinite-list-phantom" style={{ height: `${listHeight}px` }}></div>
			<div className="infinite-list" style={{ transform: `translateY(${startOffset}px)` }}>
				{visibleData.map((item, i) => (
					<div className="infinite-list-item" style={{ height: `${itemSize}px` }} key={i}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default VirtualList;
