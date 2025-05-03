import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default defineConfig([
  globalIgnores(['vite.config.js', 'dist']),
  {
    name: 'react files',
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      js,
      stylisticJs,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      semi: ['error', 'never'],
      indent: ['error', 2],
      quotes: ['error', 'single'],
      eqeqeq: ['error'],
      'no-trailing-spaces': ['error'],
      'object-curly-spacing': ['error', 'always'],
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])