import { useEffect } from 'react';
import { Graph, Color } from '@antv/x6';
import { register } from '@antv/x6-react-shape';

const NetMap = () => {
	const MyComponent = ({ node }) => {
		const label = node.prop('label');
		const width = node.prop('width');
		const height = node.prop('height');
		console.log('label', width);
		return (
			<div
				style={{
					color: 'red',
					// width,
					// height,
					textAlign: 'center',
					lineHeight: '50px',
					borderRadius: 4,
					overflow: 'auto',
					border: '1px solid',
					background: '#ffff',
				}}
			>
				{label}
			</div>
		);
	};

	useEffect(() => {
		register({
			shape: 'custom-node',
			// width: 50,
			// height: 50,
			// effect: ["color"],
			component: MyComponent,
		});

		const graph = new Graph({
			container: document.getElementById('container'),
			grid: true,
		});

		const source = graph.addNode({
			id: 1,
			x: 120,
			y: 50,
			label: 'test1',
			width: 200,
			height: 200,
			shape: 'custom-node',
		});

		const target = graph.addNode({
			id: 2,
			x: 320,
			y: 260,
			label: 'test2',
			shape: 'custom-node',
		});

		graph.addEdge({
			source,
			target,
		});
	}, []);

	return <div style={{ width: 1000, height: 800 }} id="container"></div>;
};

export default NetMap;
