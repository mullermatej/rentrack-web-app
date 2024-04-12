import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Promijeniti proxy target na render/vercel backend
export default defineConfig({
	server: {
		proxy: {},
	},
	plugins: [react()],
});
