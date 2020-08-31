const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = function(env) {
	console.log('run analyze webpack config');
	const prodConfig = require('./webpack.config.prod')(env);
	return merge(prodConfig, {
		plugins: [
			new BundleAnalyzerPlugin()
		]
	});
};
