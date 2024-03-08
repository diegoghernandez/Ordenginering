module.exports = {
	'env': {
		'browser': true,
		'es2024': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended'
	],
	'overrides': [
		{
			'env': {
					'node': true
			},
			'files': [
					'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
					'sourceType': 'script'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'react',
		'cypress'
	],
	'rules': {
		'react/react-in-jsx-scope': 'off',
		'no-console': 'error',
		'react/prop-types': 'off',
		'quotes': ['error', 'single'],
		'semi': ['error', 'never']
	}
}
