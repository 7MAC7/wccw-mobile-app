import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    base: '/',
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env.FIREBASE_API_KEY': JSON.stringify(env.FIREBASE_API_KEY || ''),
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-utils': ['lucide-react', 'recharts'],
            'vendor-firebase': ['firebase/app', 'firebase/firestore'],
          },
        },
      },
    },
  };
});