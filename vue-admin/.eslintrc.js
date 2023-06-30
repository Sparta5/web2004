module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
		ecmaVersion: 6
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'prettier/prettier': 'error',
		'no-unused-vars': ['error', { args: 'none' }],
		'import/extensions': 'off',
		'global-require': 'off'
	}
};
