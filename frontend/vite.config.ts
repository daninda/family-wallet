import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import env from './src/environment';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: env.VITE_PORT,
    strictPort: true,
  },
});
