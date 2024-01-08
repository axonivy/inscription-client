/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../../config/base.eslintrc.json'],
  ignorePatterns: ['playwright.*.ts', 'vite.*.ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  }
};
