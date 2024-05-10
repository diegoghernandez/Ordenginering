import eslintPluginAstro from 'eslint-plugin-astro';
import eslintReact from 'eslint-plugin-react'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
	...eslintPluginAstro.configs.recommended,
{
	files: ["src/**/*.ts"],
	ignores: ['dist/'],
	settings: {},
	languageOptions: {
		parser: tsParser,
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			project: './tsconfig.json'
		}
	},
	plugins: {
		'@typescript-eslint': tsPlugin,
		tsPlugin,
		react: eslintReact
	},
	rules: {
		...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs['recommended'].rules,
		'react/react-in-jsx-scope': 'off',
		'no-console': 'error',
		'react/prop-types': 'off',
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		'@typescript-eslint/triple-slash-reference': 'off',
		'@typescript-eslint/no-floating-promises': 'error',
		'@typescript-eslint/no-unused-vars': [
			'error', { 'ignoreRestSiblings': true }
		]
	}
}]
