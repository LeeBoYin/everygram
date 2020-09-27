const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const { InjectManifest } = require('workbox-webpack-plugin');
const autoprefixer = require('autoprefixer');
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
		module: {
			rules: [
				{
					test: /\.js$/,
					include: path.resolve(__dirname, 'src'),
					loader: 'babel-loader',
				},
				{
					test: /\.vue$/,
					include: path.resolve(__dirname, 'src'),
					use: 'vue-loader'
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{ loader: 'css-loader' },
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [autoprefixer()]
							}
						},
						{
							loader: 'sass-loader',
							options: {
								// Prefer Dart Sass
								implementation: require('sass'),

								// See https://github.com/webpack-contrib/sass-loader/issues/804
								webpackImporter: false,
								sassOptions: {
									includePaths: ['./node_modules']
								},
							}
						}
					]
				}
			]
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
