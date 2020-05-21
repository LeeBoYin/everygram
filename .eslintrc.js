module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: [
		'vue',
	],
	rules: {
		'no-undef': ['off'],
		'prefer-const': ['error'],
		'object-curly-spacing': ['warn', 'always'],
	},
};
