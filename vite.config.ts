import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			react(),
			viteMockServe({
				mockPath: './src/mock', // mock文件夹路径默认是 src/mock
				enable: mode === 'development' ? true : false, // 默认是 false,可以根据环境变量开启
			}),
		],
		define: {
			VITE_LOCAL_PORT: JSON.stringify(env.VITE_LOCAL_PORT),
		},
		server: {
			host: true,
			port: Number(env.VITE_LOCAL_PORT),
		},
		resolve: {
			extensions: ['.js', '.ts', '.json', '.tsx'],
			alias: {
				'@': path.join(__dirname, './src'),
			},
		},
	};
});
