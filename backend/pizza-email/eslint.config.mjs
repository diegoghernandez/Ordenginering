import pluginJs from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{ files: ['./resources/js/**/*.{js,mjs,cjs,jsx}'] },
	{
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json',
			},
		},
		settings: { react: { version: '18.3' } },
		plugins: {
			'react-hooks': pluginReactHooks,
			'react-refresh': pluginReactRefresh,
		},
		extends: [
			pluginJs.configs.recommended,
			pluginReact.configs.flat['jsx-runtime'],
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
		],
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': 'warn',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/no-floating-promises': 'error',
		},
	}
)
