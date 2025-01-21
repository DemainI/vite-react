/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			// 宽度
			width: Array.from({ length: 1000 }).reduce((map, _, index) => {
				map[index] = `${index}px`;
				return map;
			}, {}),
			// 高度
			height: Array.from({ length: 1000 }).reduce((map, _, index) => {
				map[index] = `${index}px`;
				return map;
			}, {}),
			// 字体大小
			fontSize: Array.from({ length: 100 }).reduce((map, _, index) => {
				map[index] = `${index}px`;
				return map;
			}, {}),
			// 行高
			lineHeight: Array.from({ length: 1000 }).reduce((map, _, index) => {
				map[index] = `${index}px`;
				return map;
			}, {}),
		},
		padding: Array.from({ length: 1000 }).reduce((map, _, index) => {
			map[index] = `${index}px`;
			return map;
		}, {}),
		// 外边距
		spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
			map[index] = `${index}px`;
			return map;
		}, {}),
		// 圆角
		borderRadius: Array.from({ length: 100 }).reduce((map, _, index) => {
			map[index] = `${index}px`;
			return map;
		}, {}),
	},
	plugins: [],
};
