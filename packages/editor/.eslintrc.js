/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['react-app', 'react-app/jest'],
  ignorePatterns: ['**/{style,node_modules,lib}'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  }
};
