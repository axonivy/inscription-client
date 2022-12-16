/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['react-app'],
  ignorePatterns: ['**/{node_modules,public,build}'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  }
};
