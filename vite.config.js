import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all IPv4 and IPv6 addresses (127.0.0.1 and localhost)
    port: 5173,
    strictPort: false
  }
});
