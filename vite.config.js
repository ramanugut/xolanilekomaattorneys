import { defineConfig } from 'vite';

// Bind to all interfaces so the dev/preview server is reachable in the
// Cloud Agent VM, and keep the port stable for tooling.
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
});
