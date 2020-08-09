const { merge } = require('webpack-merge');
module.exports = function(env) {
	console.log('run production webpack config');
	const baseConfig = require('./webpack.config.base')(env);
	return merge(baseConfig, {
		output: {
			filename: '[name].[contenthash].js',
		},
	});
};
