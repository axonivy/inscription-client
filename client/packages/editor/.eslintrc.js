/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['react-app', 'react-app/jest'],
  ignorePatterns: ['**/{css,node_modules,lib}'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'dev.tsconfig.json'
  }
};
