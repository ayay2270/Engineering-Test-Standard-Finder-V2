import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Engineering-Test-Standard-Finder-V2/' : '/',
  plugins: [react()],
}));
