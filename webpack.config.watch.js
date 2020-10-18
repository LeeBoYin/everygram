const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function(env) {
	console.log('run watch webpack config');
	const baseConfig = require('./webpack.config.base')(env);
	return merge(baseConfig, {
		watch: true,
		watchOptions: {
			poll: 300,
			ignored: ['node_modules/**'],
		},
		devtool: 'inline-source-map',
		output: {
			filename: '[name].bundle.js',
		},
		plugins: [
			new MiniCssExtractPlugin(),
		],
	});
};
