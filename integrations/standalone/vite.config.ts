import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { UserConfig, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  const config: UserConfig = {
    plugins: [react(), tsconfigPaths()],
    build: { outDir: 'build', chunkSizeWarningLimit: 5000, rollupOptions: { input: { index: './index.html', mock: './mock.html' } } },
    server: { port: 3000, open: true },
    resolve: {
      alias: {
        path: 'path-browserify',
        '@axonivy/inscription-core': resolve(__dirname, '../../packages/core/src'),
        '@axonivy/inscription-editor': resolve(__dirname, '../../packages/editor/src'),
        '@axonivy/inscription-protocol': resolve(__dirname, '../../packages/protocol/src')
      }
    },
    base: './',
    optimizeDeps: {
      needsInterop: [
        'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js',
        'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js'
      ]
    }
  };
  if (process.env.MOCK) {
    config.server!.open = false;
  }
  return config;
});
