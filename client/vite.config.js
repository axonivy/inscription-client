import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: { outDir: 'build', chunkSizeWarningLimit: 4000 },
    server: { port: 3000, open: true },
    resolve: {
        alias: { path: "path-browserify" }
    },
    optimizeDeps: { 
        needsInterop: ['monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js', 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js']
    }
  });