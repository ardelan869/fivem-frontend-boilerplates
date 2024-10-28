import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules', 'dist', 'eslint.config.js']
  },
  {
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      globals: {
        browser: true,
        node: true,
        es2020: true
      }
    },
    plugins: {
      vue, // Plugin eingebunden als Objekt
      '@typescript-eslint': typescriptEslint
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  prettier
];
