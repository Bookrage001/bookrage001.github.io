const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();

module.exports = [
  {
    ignores: ['dist/**/*', 'out-tsc/**/*', 'node_modules/**/*', 'docs/**/*', 'e2e/**/*', 'eslint.config.js', '**/*.spec.ts', '**/*.test.ts'],
  },
  ...compat.extends('plugin:@angular-eslint/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    files: ['*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      '@angular-eslint': require('@angular-eslint/eslint-plugin'),
    },
    rules: {},
  },
  {
    files: ['*.html'],
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
    },
    rules: {},
  },
];
