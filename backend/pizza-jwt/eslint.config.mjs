import pluginJs from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
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
		extends: [
			pluginJs.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
		],
		rules: {
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/no-floating-promises': 'error',
		},
	}
)
