import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [react()],
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
