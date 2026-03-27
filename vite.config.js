import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' allows loading variables without the VITE_ prefix if needed.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: "/Manishportfolio/",
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          // Access the variable from the loaded env object
          target: env.VITE_API_TARGET, 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})
