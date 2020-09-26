const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function(env) {
	console.log('run watch webpack config');
	const baseConfig = require('./webpack.config.base')(env);
	return merge(baseConfig, {
		watch: true,
		watchOptions: {
			poll: true,
		},
		output: {
			filename: '[name].bundle.js',
		},
		plugins: [
			new MiniCssExtractPlugin(),
		],
	});
};
