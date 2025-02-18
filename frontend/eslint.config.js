import eslintPluginAstro from 'eslint-plugin-astro'
import eslintReact from 'eslint-plugin-react'
import eslintHooks from 'eslint-plugin-react-hooks'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

/** @type { import('eslint').Linter.Config[] } */
export default [
	...eslintPluginAstro.configs.recommended,
	{
		files: ['src/**/*.{ts,tsx}'],
		ignores: ['dist/'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			tsPlugin,
			react: eslintReact,
			'react-hooks': eslintHooks,
		},
		rules: {
			...eslintHooks.configs.recommended.rules,
			...tsPlugin.configs['eslint-recommended'].rules,
			...tsPlugin.configs['recommended'].rules,
			'react/react-in-jsx-scope': 'off',
			'no-console': 'error',
			'react/prop-types': 'off',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'never'],
			'@typescript-eslint/triple-slash-reference': 'off',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ ignoreRestSiblings: true },
			],
		},
	},
]
