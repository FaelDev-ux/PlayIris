import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  esbuild: {
    jsx: 'transform',
    jsxInject: `import * as h from 'jsx-dom'`,
    jsxFactory: 'h.createElement',
    jsxFragment: 'h.Fragment',
  }
});