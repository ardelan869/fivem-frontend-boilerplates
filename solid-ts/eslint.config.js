import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    ignores: ['dist', 'eslint.config.js']
  },
  {
    languageOptions: {
      parser: typescriptParser,
      globals: {
        browser: true,
        es2020: true
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  prettier
];
