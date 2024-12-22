import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import env from './src/environment';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: env.VITE_PORT,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite(path) {
                    return path.replace(/^\/api/, '');
                },
            },
        },
        strictPort: true,
    },
});
