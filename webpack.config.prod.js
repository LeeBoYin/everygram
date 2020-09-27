const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const { InjectManifest } = require('workbox-webpack-plugin');
module.exports = function(env) {
	console.log('run production webpack config');
	const baseConfig = require('./webpack.config.base')(env);
	return merge(baseConfig, {
		output: {
			filename: '[name].[contenthash].js',
		},
		optimization: {
			minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].css',
				chunkFilename: '[id].[contenthash].css',
				ignoreOrder: true, // Enable to remove warnings about conflicting order
			}),
			new InjectManifest({
				swSrc: '@/service-worker.js',
				swDest: 'service-worker.js',
				maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
			}),
		],
	});
};
