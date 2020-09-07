const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const { InjectManifest } = require('workbox-webpack-plugin');
const autoprefixer = require('autoprefixer');
const GoogleFontsPlugin = require('google-fonts-plugin');

module.exports = function () {
	return {
		// js
		entry: {
			main: ['./src/main.js'],
			// lazy: ['./src/lazy.js'],
		},
		output: {
			// filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
				minSize: Infinity, // 避免產生 cacheGroups 定義以外的檔案
				maxSize: 0,
				cacheGroups: {
					// 必要的第三方套件，需在 layout 引入
					coreVendors: {
						test: /[\\/]node_modules[\\/](lodash|lodash-es|moment|@firebase|vue)([\\/]|$)/,
						name: 'coreVendors',
						priority: 10,
						reuseExistingChunk: true,
						enforce: true,
					},
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						priority: 1,
						reuseExistingChunk: true,
						enforce: true,
					},
				},
			},
		},
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@': path.resolve(__dirname, 'src'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@class': path.resolve(__dirname, 'src/class'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@demo': path.resolve(__dirname, 'src/demo'),
				'@directives': path.resolve(__dirname, 'src/directives'),
				'@libs': path.resolve(__dirname, 'src/libs'),
				'@mixins': path.resolve(__dirname, 'src/mixins'),
				'@plugins': path.resolve(__dirname, 'src/plugins'),
				'@store': path.resolve(__dirname, 'src/store'),
				'@style': path.resolve(__dirname, 'src/style'),
				'@views': path.resolve(__dirname, 'src/views'),
			},
			extensions: ['*', '.js', '.vue', '.json']
		},
		module: {
			rules: [
				{ test: /\.js$/, use: 'babel-loader' },
				{ test: /\.vue$/, use: 'vue-loader' },
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader',
					],
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
			new HtmlWebpackPlugin({
				template: './src/index.html',
				// inject: false, // for vue router mode history
			}),
			new CopyPlugin([
				{ from: 'static', to: 'static' },
				{ from: 'manifest.pwa.json', to: 'manifest.pwa.json' },
			]),
			new VueLoaderPlugin(),
			new GoogleFontsPlugin('./googlefonts.config.json'),
			new webpack.ProvidePlugin({
				_: ['@libs/lodash', 'default'],
				moment: 'moment',
				Vue: ['vue/dist/vue.esm.js', 'default'],
				firebase: 'firebase/app',
				mapState: ['vuex', 'mapState'],
				mapGetters: ['vuex', 'mapGetters'],
				mapMutations: ['vuex', 'mapMutations'],
				mapActions: ['vuex', 'mapActions'],
				lang: ['@libs/lang', 'lang'],
				getCategoryName: ['@libs/lang', 'getCategoryName'],
				constant: ['@libs/constants', 'constant'],
				uuid: ['uuid', 'v4'],
			}),
			new InjectManifest({
				swSrc: '@/service-worker.js',
				swDest: 'service-worker.js',
				maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
			}),
		],
	};
};
