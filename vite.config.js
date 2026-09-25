import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const forceReload = () => ({
  name: 'force-reload',
  handleHotUpdate({ file, server }) {
    if (file.endsWith('.js') || file.endsWith('.jsx')) {
      server.ws.send({ type: 'full-reload' });
      return [];
    }
  }
});

export default defineConfig({
  plugins: [tailwindcss(), forceReload()],
  esbuild: {
    jsx: 'transform',
    jsxInject: `import * as h from 'jsx-dom'`,
    jsxFactory: 'h.createElement',
    jsxFragment: 'h.Fragment',
  }
});