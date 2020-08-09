const webpack = require('webpack');
const { merge } = require('webpack-merge');
module.exports = function(env) {
	console.log('run development webpack config');
	const baseConfig = require('./webpack.config.base')(env);
	return merge(baseConfig, {
		devtool: 'inline-source-map',
		output: {
			filename: '[name].bundle.js',
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		],
		devServer: {
			open: false,
			hot: true,
			host: '0.0.0.0',
			port: 3690,
			historyApiFallback: true,// for vue router mode history
			// writeToDisk: true,
			watchOptions: {
				poll: true
			},
		},
	});
};
