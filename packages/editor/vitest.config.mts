import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    dir: 'src',
    include: ['**/*.test.ts?(x)'],
    alias: {
      '@axonivy/inscription-protocol': resolve(__dirname, '../../packages/protocol/src'),
      '@axonivy/editor-icons': resolve(__dirname, '../../packages/icons/src-gen'),
      'test-utils': resolve(__dirname, 'src/test-utils/test-utils.tsx')
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-utils/setupTests.tsx'],
    css: false,
    reporters: process.env.CI ? ['basic', 'junit'] : ['default'],
    outputFile: 'report.xml'
  }
});
