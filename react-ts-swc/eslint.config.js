import js from '@eslint/js';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';

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
      '@typescript-eslint': typescriptEslint,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'react-compiler/react-compiler': 'error'
    }
  },
  prettier
];
