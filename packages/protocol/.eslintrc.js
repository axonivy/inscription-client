/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../../config/base.eslintrc.json'],
  ignorePatterns: ['schemaCodegen.js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
